import { BaseNodeData, Node } from "./base";

interface ImageNodeData extends BaseNodeData {
  image: {
    src: string;
    size: string;
  };
  stroke: {
    width: number;
    color: string;
    opacity: number;
  };
}

export type ImageNode = Node<ImageNodeData>;
