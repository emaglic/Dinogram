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
}

interface RichTextNodeData extends BaseNodeData {}

interface WebNodeData extends BaseNodeData {
  src: string;
}

type RichTextNode = Node<RichTextNodeData>;
type WebNode = Node<WebNodeData>;

export type ChartNode = WebNode | RichTextNode;
