type NodeTypes = "web" | "richText";

interface Node<TData extends BaseNodeData> {
  id: string;
  position: { x: number; y: number };
  data: TData;
  type: NodeTypes;
}

interface BaseNodeData {
  label: string;
}

interface RichTextNodeData extends BaseNodeData {}

interface WebNodeData extends BaseNodeData {
  src: string;
}

type RichTextNode = Node<RichTextNodeData>;
type WebNode = Node<WebNodeData>;

export type ChartNode = WebNode | RichTextNode;
