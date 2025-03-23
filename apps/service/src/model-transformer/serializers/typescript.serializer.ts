import { IntermediateFormat, ArrayType, ObjectType, PropertyType } from '../utils/base.parser';

export class TypeScriptSerializer {
  serialize(model: IntermediateFormat): string {
    const properties = model.properties
      .map((prop) => this.serializeProperty(prop.name, prop.type, prop.isOptional))
      .join('\n  ');

    return `interface ${model.className} {\n  ${properties}\n}`;
  }

  private serializeProperty(name: string, type: PropertyType, isOptional?: boolean): string {
    const optionalFlag = isOptional ? '?' : '';
    return `${name}${optionalFlag}: ${this.getTypeScriptType(type)};`;
  }

  private getTypeScriptType(type: PropertyType): string {
    if (typeof type === 'string') {
      return type;
    }

    if ((type as ArrayType).isArray) {
      const arrayType = type as ArrayType;
      return `${this.getTypeScriptType(arrayType.type)}[]`;
    }

    if ((type as ObjectType).properties) {
      const objectType = type as ObjectType;
      const nestedProperties = objectType.properties
        .map((prop) => this.serializeProperty(prop.name, prop.type, prop.isOptional))
        .join('\n  ');
      return `{\n  ${nestedProperties}\n}`;
    }

    return 'any';
  }
}
