import { BaseNodeData, Node } from "./base";

interface RichTextNodeData extends BaseNodeData {}

export type RichTextNode = Node<RichTextNodeData>;
