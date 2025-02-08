import getNewRichTextNode from "./richText";
import getNewWebNode from "./web";
import getNewTextNode from "./text";
import ArticleIcon from "@mui/icons-material/Article";
import LanguageIcon from "@mui/icons-material/Language";
import FormatSizeIcon from "@mui/icons-material/FormatSize";

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
};

export default nodeTypes;
