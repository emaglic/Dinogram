type NodeTypes = "web" | "richText";

interface Node<TData extends BaseNodeData> {
  id: string;
  position: { x: number; y: number };
  data: TData;
  type: NodeTypes;
  selected: boolean;
}

interface BaseNodeData {
  label: string;
  zIndex: number;
  type: "node";
  visible: boolean;
  locked: boolean;
}

interface RichTextNodeData extends BaseNodeData {}

interface WebNodeData extends BaseNodeData {
  src: string;
}

interface ShapeNodeData extends BaseNodeData {
  shape: string;
}

type RichTextNode = Node<RichTextNodeData>;
type WebNode = Node<WebNodeData>;
type ShapeNode = Node<ShapeNodeData>;

export type ChartNode = WebNode | RichTextNode | ShapeNode;
