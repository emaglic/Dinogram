import getNewRichTextNode from "./richText";
import getNewWebNode from "./web";
import ArticleIcon from "@mui/icons-material/Article";
import LanguageIcon from "@mui/icons-material/Language";

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
};

export default nodeTypes;
