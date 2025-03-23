import { IntermediateFormat, ArrayType, ObjectType, PropertyType } from '../utils/base.parser';

export class CSharpSerializer {
  serialize(model: IntermediateFormat): string {
    const properties = model.properties
      .map((prop) => this.serializeProperty(prop.name, prop.type, prop.isOptional))
      .join('\n  ');

    return `public class ${model.className} {\n  ${properties}\n}`;
  }

  private serializeProperty(name: string, type: PropertyType, isOptional?: boolean): string {
    const optionalFlag = isOptional ? '?' : '';
    return `public ${this.getCSharpType(type)}${optionalFlag} ${this.capitalize(name)} { get; set; }`;
  }

  private getCSharpType(type: PropertyType): string {
    if (typeof type === 'string') {
      return this.mapToCSharpType(type);
    }

    if ((type as ArrayType).isArray) {
      const arrayType = type as ArrayType;
      return `List<${this.getCSharpType(arrayType.type)}>`;
    }

    if ((type as ObjectType).properties) {
      return 'object';
    }

    return 'object';
  }

  private mapToCSharpType(type: string): string {
    const typeMap: Record<string, string> = {
      string: 'string',
      number: 'int',
      boolean: 'bool',
      Date: 'DateTime',
      any: 'object',
    };
    return typeMap[type] || 'object';
  }

  private capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
