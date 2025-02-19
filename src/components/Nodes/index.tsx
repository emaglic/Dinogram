import RichText from "./RichText";
import Web from "./Web";
import Shape from "./Shape";
import Text from "./Text";
import Image from "./Image";
import Video from "./Video";
import Code from "./Code";
import Drawing from "./Drawing";

export const RichTextNode = RichText;
export const WebNode = Web;
export const ShapeNode = Shape;
export const TextNode = Text;
export const ImageNode = Image;
export const VideoNode = Video;
export const CodeNode = Code;
export const DrawingNode = Drawing;

export const nodeTypes = {
  web: WebNode,
  richText: RichTextNode,
  shape: ShapeNode,
  text: TextNode,
  image: ImageNode,
  video: VideoNode,
  code: CodeNode,
  drawing: DrawingNode,
};
