import {
  BaseParser,
  IntermediateFormat,
  ModelProperty,
  PropertyType,
  ArrayType,
  ObjectType,
} from '../utils/base.parser';

export class TypeScriptParser extends BaseParser {
  parse(tsModel: string): IntermediateFormat {
    const lines = tsModel.split('\n').map((line) => line.trim());
    const classNameMatch = lines[0].match(/interface (\w+)/);
    if (!classNameMatch) {
      throw new Error('Invalid TypeScript model');
    }

    const className = classNameMatch[1];
    const properties: ModelProperty[] = [];

    for (const line of lines.slice(1)) {
      const match = line.match(/(\w+)\??: ([\w\[\]\{\}<,>]+);/);
      if (match) {
        const [, name, type] = match;
        const isOptional = line.includes('?');
        const propertyType = this.getPropertyType(type);
        properties.push({
          name,
          type: propertyType,
          isOptional,
        });
      }
    }

    return {
      className,
      properties,
    };
  }

  // Parse TypeScript types into PropertyType
  private getPropertyType(type: string): PropertyType {
    if (type.endsWith('[]')) {
      // Handle arrays (string[], number[], etc.)
      return {
        type: this.mapToCSharpType(type.slice(0, -2)),
        isArray: true,
      } as ArrayType;
    }

    if (type === 'any' || type === 'Date') {
      return type as PropertyType;
    }

    return this.mapToCSharpType(type);
  }

  // Map TypeScript types to Intermediate Format
  private mapToCSharpType(type: string): PropertyType {
    const typeMap: Record<string, string> = {
      string: 'string',
      number: 'number',
      boolean: 'boolean',
      Date: 'Date',
      any: 'any',
    };
    return (typeMap[type] as PropertyType) || 'any';
  }
}
