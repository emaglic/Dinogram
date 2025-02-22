type NodeTypes = "web" | "richText";

export interface Node<TData extends BaseNodeData> {
  id: string;
  position: { x: number; y: number };
  width: number;
  height: number;
  data: TData;
  type: NodeTypes;
  selected: boolean;
}

export interface BaseNodeData {
  label: string;
  zIndex: number;
  type: "node";
  visible: boolean;
  locked: boolean;
  iconKey: string;
}
