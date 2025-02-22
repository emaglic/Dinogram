/* { id: "e1-2", source: "1", target: "2" } */

export interface ChartEdge {
  id: string;
  source: string;
  target: string;
  selected: boolean;
  data: {
    label: string;
    iconKey: string;
    zIndex: number;
    type: "edge";
    pathType: string;
    visible: boolean;
    locked: boolean;
    stroke: {
      color: string;
      width: number;
      opacity: number;
    };
  };
}
