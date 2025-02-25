import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { ChartNode } from "@/types/chart/nodes";
import { ChartEdge } from "@/types/chart/edges";
import { RootState } from "@/state/store";
import { addEdge, applyNodeChanges, applyEdgeChanges } from "@xyflow/react";
import getNewChart from "@/base/chart";
import { create, isEqual } from "lodash";
import getBaseEdge from "@/base/edges/baseEdge";
import { v4 as uuidv4 } from "uuid";
import {
  handleDragLockAxis,
  handleUpdateDimensions,
  handleDimensionsLockAxis,
} from "@/state/Chart/utils";

interface ChartState {
  nodes: ChartNode[];
  edges: ChartEdge[];
  timestamp: number;
}

interface ChartHistoryState {
  history: ChartState[];
  currentIndex: number;
  undoLimit: number;
  historyLockUntil: number | null; // ⏳ Prevents edits for a short period after undo/redo
  historyCooldownMs: number; // ⏳ Configurable cooldown period
}

const initialState: ChartHistoryState = {
  history: [{ ...getNewChart(), timestamp: Date.now() }],
  currentIndex: 0,
  undoLimit: 100,
  historyLockUntil: null,
  historyCooldownMs: 500, // 🕒 1-second cooldown after undo/redo
};

// ✅ Only allow a new history entry if it's a true user edit
const pushToHistory = (
  state: ChartHistoryState,
  newEntry: { nodes: ChartNode[]; edges: ChartEdge[] }
) => {
  const newTimestamp = Date.now();

  // ⏳ Write history to currentIndex during cooldown period.
  if (state.historyLockUntil && newTimestamp < state.historyLockUntil) {
    // console.log("⏳ Skipping history update (Cooldown active)");
    state.history[state.currentIndex] = {
      ...newEntry,
      timestamp: newTimestamp,
    };
    return;
  }

  const latest = state.history[state.currentIndex];

  // 🔹 Prevent duplicate states
  if (isEqual({ nodes: latest.nodes, edges: latest.edges }, newEntry)) {
    // console.log("🔄 Skipping duplicate state.");
    return;
  }

  // ✅ If this edit is NOT caused by undo/redo, clear redo history
  if (state.currentIndex < state.history.length - 1) {
    // console.log("✂️ Clearing redo history (User Edit Detected)");
    state.history = state.history.slice(0, state.currentIndex + 1);
  }

  // ✅ Maintain undo limit
  if (state.history.length >= state.undoLimit) {
    state.history.shift();
    state.currentIndex--; // Adjust index after shift
  }

  // ✅ Add new entry
  state.history.push({ ...newEntry, timestamp: newTimestamp });
  state.currentIndex = state.history.length - 1;
  state.historyLockUntil = null; // Reset cooldown
};

const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {
    // Node Reducers
    // ===============================================
    onNodesChange: (state, action) => {
      const [payload, dragLockAxis] = action.payload;

      let currentNodes = state.history[state.currentIndex].nodes;

      const updatedPayload = payload.map((p) => {
        let returnValue = handleDragLockAxis(p, currentNodes, dragLockAxis);
        // NEED TO FIX THIS
        /* returnValue = handleDimensionsLockAxis(
          returnValue,
          currentNodes,
          dragLockAxis
        ); */
        return returnValue;
      });

      // NEED TO FIX THIS
      currentNodes = handleUpdateDimensions(payload, currentNodes);

      const updatedNodes = applyNodeChanges(updatedPayload, currentNodes);

      pushToHistory(state, {
        nodes: updatedNodes,
        edges: state.history[state.currentIndex].edges,
      });
    },
    onSelectNode: (state, action) => {
      const { id, keyboardKeys } = action.payload;
      const updatedNodes = state.history[state.currentIndex].nodes.map(
        (node) => ({
          ...node,
          selected:
            node.id === id
              ? !node.selected
              : !keyboardKeys?.ctrl
              ? false
              : node.selected,
        })
      );

      // Clear all selected edges when selecting a node
      const updatedEdges = state.history[state.currentIndex].edges.map(
        (edge) => ({
          ...edge,
          selected: false,
        })
      );

      pushToHistory(state, {
        nodes: updatedNodes,
        edges: updatedEdges,
      });
    },
    updateNodeOrder: (state, action) => {
      pushToHistory(state, {
        nodes: action.payload,
        edges: state.history[state.currentIndex].edges,
      });
    },
    createNode: (state, action) => {
      const newNode = action.payload;
      const updatedNodes = [
        ...state.history[state.currentIndex].nodes.map((node) => ({
          ...node,
          selected: false,
        })),
        newNode,
      ];
      pushToHistory(state, {
        nodes: updatedNodes,
        edges: state.history[state.currentIndex].edges,
      });
    },
    updateNode: (state, action) => {
      const updatedNodes = state.history[state.currentIndex].nodes.map((node) =>
        node.id === action.payload.id ? action.payload : node
      );
      pushToHistory(state, {
        nodes: updatedNodes,
        edges: state.history[state.currentIndex].edges,
      });
    },
    updateNodes: (state, action) => {
      const updatedNodes = state.history[state.currentIndex].nodes.map(
        (node) => {
          const updatedNode = action.payload.find(
            (newNode: ChartNode) => newNode.id === node.id
          );
          return updatedNode
            ? {
                ...node,
                ...updatedNode,
                data: {
                  ...node.data,
                  ...updatedNode.data,
                },
              }
            : node;
        }
      );
      pushToHistory(state, {
        nodes: updatedNodes,
        edges: state.history[state.currentIndex].edges,
      });
    },
    pasteNodes: (
      state,
      action: PayloadAction<{
        nodes: ChartNode[];
        position: { x: number; y: number };
      }>
    ) => {
      // Deselect all current nodes.
      let updatedNodes = state.history[state.currentIndex].nodes.map(
        (node) => ({
          ...node,
          selected: false,
        })
      );

      const { nodes, position } = action.payload;

      if (nodes && nodes.length > 0) {
        // Determine the minimum x and y values among the nodes to be pasted.
        const minX = Math.min(...nodes.map((node) => node.position.x));
        const minY = Math.min(...nodes.map((node) => node.position.y));

        const newNodes = nodes.map((node, index) => {
          const offsetX = node.position.x - minX;
          const offsetY = node.position.y - minY;

          return {
            ...node,
            id: uuidv4(), // Generate a new id for the pasted node.
            selected: true,
            // Calculate the new position so that the first node's offset is (0,0)
            // and other nodes keep their spacing, scaled by a factor of 2.
            position: {
              x: position.x + offsetX,
              y: position.y + offsetY,
            },
            data: {
              ...node.data,
              label: `${node.data.label}`,
              zIndex: updatedNodes.length + index,
            },
          };
        });
        updatedNodes = [...updatedNodes, ...newNodes];
      }

      pushToHistory(state, {
        nodes: updatedNodes,
        edges: state.history[state.currentIndex].edges,
      });
    },

    duplicateNodes: (state, action: PayloadAction<ChartNode[]>) => {
      console.log("action.payload: ", action.payload);
      let updatedNodes = state.history[state.currentIndex].nodes.map(
        (node) => ({
          ...node,
          selected: false,
        })
      );

      if (action.payload) {
        const newNodes = action.payload.map((node, index) => {
          return {
            ...node,
            id: uuidv4(),
            selected: true,
            position: {
              ...node.position,
              x: node.position.x + 10,
              y: node.position.y + 10,
            },
            data: {
              ...node.data,
              label: `${node.data.label}`,
              zIndex: updatedNodes.length + index,
            },
          };
        });
        updatedNodes = [...updatedNodes, ...newNodes];
      }
      pushToHistory(state, {
        nodes: updatedNodes,
        edges: state.history[state.currentIndex].edges,
      });
    },
    deleteNodes: {
      reducer: (state, action: PayloadAction<ChartNode[] | undefined>) => {
        let updatedNodes = state.history[state.currentIndex].nodes;
        if (action?.payload) {
          const idsToDelete = new Set(action.payload.map((node) => node.id));
          updatedNodes = updatedNodes.filter(
            (node) => !idsToDelete.has(node.id)
          );
        } else {
          updatedNodes = state.history[state.currentIndex].nodes.filter(
            (node) => !node.selected || node.data.locked || !node.data.visible
          );
        }

        pushToHistory(state, {
          nodes: updatedNodes,
          edges: state.history[state.currentIndex].edges,
        });
      },
      prepare: (payload?: ChartNode[]) => ({ payload }),
    },
    updateNodeData: (state, action) => {
      const updatedNodes = state.history[state.currentIndex].nodes.map((node) =>
        node.id === action.payload.id
          ? { ...node, data: { ...node.data, ...action.payload.data } }
          : node
      );
      pushToHistory(state, {
        nodes: updatedNodes,
        edges: state.history[state.currentIndex].edges,
      });
    },

    // Edge Reducers
    // ===============================================
    onConnect: (state, action) => {
      const edges = state.history[state.currentIndex].edges;
      const updatedEdges = addEdge(
        {
          ...action.payload,
          ...getBaseEdge(edges),
          type: "customEdge",
          selected: true,
        },
        state.history[state.currentIndex].edges
      );
      pushToHistory(state, {
        nodes: state.history[state.currentIndex].nodes,
        edges: updatedEdges,
      });
    },
    onEdgesChange: (state, action) => {
      const updatedEdges = applyEdgeChanges(
        action.payload,
        state.history[state.currentIndex].edges
      );

      pushToHistory(state, {
        nodes: state.history[state.currentIndex].nodes,
        edges: updatedEdges,
      });
    },
    onSelectEdge: (state, action) => {
      const { id, keyboardKeys } = action.payload;
      const updatedEdges = state.history[state.currentIndex].edges.map(
        (edge) => ({
          ...edge,
          selected:
            edge.id === id
              ? !edge.selected
              : !keyboardKeys?.ctrl
              ? false
              : edge.selected,
        })
      );

      // Clear all selected nodes when selecting an edge
      const updatedNodes = state.history[state.currentIndex].nodes.map(
        (node) => ({
          ...node,
          selected: false,
        })
      );

      pushToHistory(state, {
        nodes: updatedNodes,
        edges: updatedEdges,
      });
    },
    updateEdgeOrder: (state, action) => {
      pushToHistory(state, {
        nodes: state.history[state.currentIndex].nodes,
        edges: action.payload,
      });
    },
    createEdge: (state, action) => {
      const newEdge = action.payload;
      const updatedEdges = [
        ...state.history[state.currentIndex].edges.map((edge) => ({
          ...edge,
          selected: false,
        })),
        newEdge,
      ];
      pushToHistory(state, {
        nodes: state.history[state.currentIndex].nodes,
        edges: updatedEdges,
      });
    },
    updateEdge: (state, action) => {
      const updatedEdges = state.history[state.currentIndex].edges.map((edge) =>
        edge.id === action.payload.id ? action.payload : edge
      );
      pushToHistory(state, {
        nodes: state.history[state.currentIndex].nodes,
        edges: updatedEdges,
      });
    },
    updateEdges: (state, action?: PayloadAction<ChartEdge[]> | undefined) => {
      const updatedEdges = state.history[state.currentIndex].edges.map(
        (edge) => {
          const updatedEdge = action?.payload.find(
            (newEdge) => newEdge.id === edge.id
          );
          return updatedEdge
            ? {
                ...edge,
                ...updatedEdge,
                data: {
                  ...edge.data,
                  ...updatedEdge.data,
                },
              }
            : edge;
        }
      );
      pushToHistory(state, {
        nodes: state.history[state.currentIndex].nodes,
        edges: updatedEdges,
      });
    },
    deleteEdges: {
      reducer: (state, action: PayloadAction<ChartEdge[] | undefined>) => {
        let updatedEdges = state.history[state.currentIndex].edges;
        if (action?.payload) {
          const idsToDelete = new Set(action.payload.map((edge) => edge.id));
          updatedEdges = updatedEdges.filter(
            (edge) => !idsToDelete.has(edge.id)
          );
        } else {
          updatedEdges = state.history[state.currentIndex].edges.filter(
            (edge) => !edge.selected || edge.data.locked || !edge.data.visible
          );
        }
        pushToHistory(state, {
          nodes: state.history[state.currentIndex].nodes,
          edges: updatedEdges,
        });
      },
      prepare: (payload?: ChartEdge[]) => ({ payload }),
    },
    updateEdgeData: (state, action) => {
      const updatedEdges = state.history[state.currentIndex].edges.map((edge) =>
        edge.id === action.payload.id
          ? { ...edge, data: { ...edge.data, ...action.payload.data } }
          : edge
      );
      pushToHistory(state, {
        nodes: state.history[state.currentIndex].nodes,
        edges: updatedEdges,
      });
    },

    // Global Actions
    // ===============================================
    replaceChart: (state, action) => {
      const newEntry = {
        nodes: action.payload.nodes,
        edges: action.payload.edges,
      };
      pushToHistory(state, { nodes: newEntry.nodes, edges: newEntry.edges });
    },
    undo: (state) => {
      // Prevent Undoing to 0 index which is the empty chart
      if (state.currentIndex > 1) {
        // console.log("↩️ UNDO Fired!");
        state.currentIndex--;
        state.historyLockUntil = Date.now() + state.historyCooldownMs; // 🕒 Start cooldown
      }
    },
    redo: (state) => {
      if (state.currentIndex < state.history.length - 1) {
        // console.log("🔁 REDO Fired!");
        state.currentIndex++;
        state.historyLockUntil = Date.now() + state.historyCooldownMs; // 🕒 Start cooldown
      }
    },
  },
});

export const {
  onNodesChange,
  onSelectNode,
  updateNodeOrder,
  createNode,
  updateNode,
  updateNodes,
  pasteNodes,
  duplicateNodes,
  deleteNodes,
  updateNodeData,

  onEdgesChange,
  onConnect,
  onSelectEdge,
  updateEdgeOrder,
  createEdge,
  updateEdge,
  updateEdges,
  deleteEdges,
  updateEdgeData,

  replaceChart,
  undo,
  redo,
} = chartSlice.actions;

/* export const selectChart = (state: RootState): ChartState =>
  state.chart.history[state.chart.currentIndex];
export const selectNodes = (state: RootState): ChartNode[] =>
  state.chart.history[state.chart.currentIndex].nodes;
export const selectEdges = (state: RootState): ChartEdge[] =>
  state.chart.history[state.chart.currentIndex].edges; 
export const selectChartHistory = (state: RootState): ChartState[] =>
  state.chart.history;
*/

export const selectChart = createSelector(
  (state: RootState) => state.chart,
  (chart) => chart.history[chart.currentIndex]
);

export const selectNodes = createSelector(selectChart, (chart) => chart.nodes);

export const selectEdges = createSelector(selectChart, (chart) => chart.edges);

export const selectNodeById = createSelector(
  [selectNodes, (_: RootState, id: string) => id],
  (nodes, id) => nodes.find((node) => node.id === id)
);

export const selectEdgeById = createSelector(
  [selectEdges, (_: RootState, id: string) => id],
  (edges, id) => edges.find((edge) => edge.id === id)
);

export const selectSelectedNodes = createSelector(selectNodes, (nodes) =>
  nodes.filter((node) => node.selected)
);

export const selectSelectedEdges = createSelector(selectEdges, (edges) =>
  edges.filter((edge) => edge.selected)
);

export default chartSlice.reducer;
