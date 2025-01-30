import RichText from "./RichText";
import Web from "./Web";
import Shape from "./Shape";

export const RichTextNode = RichText;
export const WebNode = Web;
export const ShapeNode = Shape;

export const nodeTypes = {
  web: WebNode,
  richText: RichTextNode,
  shape: ShapeNode,
};
