import React, { useEffect, useState } from "react";

const getSelected = (chart) => {
  const ret = {
    nodes: [],
    edges: [],
  };
  const selectedNodes = chart.nodes.filter((node) => node.selected);
  const selectedEdges = chart.edges.filter((edge) => edge.selected);
  ret.nodes = selectedNodes;
  ret.edges = selectedEdges;
  return ret;
};

const useSelectedChartElements = (chart) => {
  const [selected, setSelected] = useState({
    nodes: chart.nodes,
    edges: chart.edges,
  });

  useEffect(() => {
    setSelected(getSelected(chart));
  }, [chart]); // Re-run effect when ref.current is available

  return selected;
};

export default useSelectedChartElements;
