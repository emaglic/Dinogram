import { BaseNodeData, Node } from "./base";

export interface ShapeNodeData extends BaseNodeData {
  shape: string;
}

export type ShapeNode = Node<ShapeNodeData>;
