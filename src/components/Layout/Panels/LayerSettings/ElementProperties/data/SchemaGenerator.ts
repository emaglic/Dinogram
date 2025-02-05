import _ from "lodash";
import schemaDefinitions from ".";

class SchemaGenerator {
  baseSchema = null;
  baseUISchema = null;
  elementSchema = null;
  elementUISchema = null;

  constructor() {}

  setBase(type) {
    switch (type) {
      case "node":
        this.baseSchema = schemaDefinitions[type].schema;
        this.baseUISchema = schemaDefinitions[type].uischema;
        break;

      case "edge":
        this.baseSchema = schemaDefinitions[type].schema;
        this.baseUISchema = schemaDefinitions[type].uischema;
        break;
    }
    return this;
  }

  setElement(type) {
    this.elementSchema = schemaDefinitions[type]?.schema || {};
    this.elementUISchema = schemaDefinitions[type]?.uischema || {};
    return this;
  }

  getSchema() {
    const schema = _.merge({}, this.baseSchema, this.elementSchema);
    const uischema = _.cloneDeep(this.baseUISchema);
    if (this.elementUISchema?.elements) {
      uischema.elements.push(...this.elementUISchema.elements);
    }
    return { schema, uischema };
  }
}

export default new SchemaGenerator();
