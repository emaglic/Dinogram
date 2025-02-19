import getNewRichTextNode from "./richText";
import getNewWebNode from "./web";
import getNewTextNode from "./text";
import getNewImageNode from "./image";
import getNewVideoNode from "./video";
import getNewCodeNode from "./code";
import getNewDrawingNode from "./drawing";

import ArticleIcon from "@mui/icons-material/Article";
import LanguageIcon from "@mui/icons-material/Language";
import FormatSizeIcon from "@mui/icons-material/FormatSize";
import ImageIcon from "@mui/icons-material/Image";
import MovieIcon from "@mui/icons-material/Movie";
import CodeIcon from "@mui/icons-material/Code";
import DrawIcon from "@mui/icons-material/Draw";

const nodeTypes = {
  richText: {
    type: "richText",
    label: "Rich Text",
    icon: ArticleIcon,
    defaultData: getNewRichTextNode,
  },
  web: {
    type: "web",
    label: "Web",
    icon: LanguageIcon,
    defaultData: getNewWebNode,
  },
  text: {
    type: "text",
    label: "Text",
    icon: FormatSizeIcon,
    defaultData: getNewTextNode,
  },
  image: {
    type: "image",
    label: "Image",
    icon: ImageIcon,
    defaultData: getNewImageNode,
  },
  video: {
    type: "video",
    label: "Video",
    icon: MovieIcon,
    defaultData: getNewVideoNode,
  },
  code: {
    type: "code",
    label: "Code",
    icon: CodeIcon,
    defaultData: getNewCodeNode,
  },
  drawing: {
    type: "drawing",
    label: "Drawing",
    icon: DrawIcon,
    defaultData: getNewDrawingNode,
  },
};

export default nodeTypes;
