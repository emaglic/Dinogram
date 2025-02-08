import baseNodeSchema from "./schemas/node.schema";
import baseEdgeSchema from "./schemas/edge.schema";
import shapeSchema from "./schemas/shape.schema";
import textSchema from "./schemas/text.schema";

import baseNodeUISchema from "./uischemas/node.uischema";
import baseEdgeUISchema from "./uischemas/edge.uischema";
import shapeUISchema from "./uischemas/shape.uischema";
import textUISchema from "./uischemas/text.uischema";

const schemaDefinitions = {
  node: {
    schema: baseNodeSchema,
    uischema: baseNodeUISchema,
  },
  edge: {
    schema: baseEdgeSchema,
    uischema: baseEdgeUISchema,
  },
  shape: {
    schema: shapeSchema,
    uischema: shapeUISchema,
  },
  text: {
    schema: textSchema,
    uischema: textUISchema,
  },
};

export default schemaDefinitions;
