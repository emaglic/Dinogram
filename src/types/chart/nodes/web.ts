import { BaseNodeData, Node } from "./base";

interface WebNodeData extends BaseNodeData {
  src: string;
}

export type WebNode = Node<WebNodeData>;
