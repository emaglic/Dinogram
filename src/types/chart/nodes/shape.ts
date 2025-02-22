import { BaseNodeData, Node } from "./base";

interface ShapeNodeData extends BaseNodeData {
  shape: string;
}

export type ShapeNode = Node<ShapeNodeData>;
