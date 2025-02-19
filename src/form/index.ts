import baseNodeSchema from "./schemas/node.schema";
import baseEdgeSchema from "./schemas/edge.schema";
import shapeSchema from "./schemas/shape.schema";
import textSchema from "./schemas/text.schema";
import imageSchema from "./schemas/image.schema";
import videoSchema from "./schemas/video.schema";
import codeSchema from "./schemas/code.schema";
import drawingSchema from "./schemas/drawing.schema";

import baseNodeUISchema from "./uischemas/node.uischema";
import baseEdgeUISchema from "./uischemas/edge.uischema";
import shapeUISchema from "./uischemas/shape.uischema";
import textUISchema from "./uischemas/text.uischema";
import webSchema from "./schemas/web.schema";
import webUischema from "./uischemas/web.uischema";
import settingsSchema from "./schemas/settings.schema";
import settingsUIschema from "./uischemas/settings.uischema";
import imageUISchema from "./uischemas/image.uischema";
import videoUISchema from "./uischemas/video.uischema";
import codeUISchema from "./uischemas/code.uischema";
import drawingUISchema from "./uischemas/drawing.uischema";

const other = {
  settings: {
    schema: settingsSchema,
    uischema: settingsUIschema,
  },
};

const nodes = {
  node: {
    schema: baseNodeSchema,
    uischema: baseNodeUISchema,
  },
  shape: {
    schema: shapeSchema,
    uischema: shapeUISchema,
  },
  text: {
    schema: textSchema,
    uischema: textUISchema,
  },
  web: {
    schema: webSchema,
    uischema: webUischema,
  },
  image: {
    schema: imageSchema,
    uischema: imageUISchema,
  },
  video: {
    schema: videoSchema,
    uischema: videoUISchema,
  },
  code: {
    schema: codeSchema,
    uischema: codeUISchema,
  },
  drawing: {
    schema: drawingSchema,
    uischema: drawingUISchema,
  },
};

const edges = {
  edge: {
    schema: baseEdgeSchema,
    uischema: baseEdgeUISchema,
  },
};

const schemaDefinitions = {
  ...nodes,
  ...edges,
  ...other,
};

export default schemaDefinitions;
