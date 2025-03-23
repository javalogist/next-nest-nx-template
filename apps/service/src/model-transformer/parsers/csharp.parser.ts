import {
  BaseParser,
  IntermediateFormat,
  ModelProperty,
  PropertyType,
  ArrayType,
  ObjectType,
} from '../utils/base.parser';

export class CSharpParser extends BaseParser {
  parse(csharpModel: string): IntermediateFormat {
    const lines = csharpModel.split('\n').map((line) => line.trim());
    const classNameMatch = lines[0].match(/public class (\w+)/);
    if (!classNameMatch) {
      throw new Error('Invalid C# model');
    }

    const className = classNameMatch[1];
    const properties: ModelProperty[] = [];

    for (const line of lines.slice(1)) {
      const match = line.match(/public (\w+)(\??) (\w+) { get; set; }/);
      if (match) {
        const [, type, isOptional, name] = match;
        const propertyType = this.getPropertyType(type);
        properties.push({
          name: this.decapitalize(name),
          type: propertyType,
          isOptional: isOptional === '?',
        });
      }
    }

    return {
      className,
      properties,
    };
  }

  // Parse C# types into PropertyType
  private getPropertyType(type: string): PropertyType {
    if (type.startsWith('List<')) {
      // Handle C# List<T> arrays
      const innerType = type.slice(5, -1);
      return {
        type: this.mapToTypeScriptType(innerType),
        isArray: true,
      } as ArrayType;
    }

    if (type === 'object') {
      return {
        properties: [],
      } as ObjectType;
    }

    return this.mapToTypeScriptType(type);
  }

  // Map C# types to Intermediate Format
  private mapToTypeScriptType(type: string): PropertyType {
    const typeMap: Record<string, string> = {
      string: 'string',
      int: 'number',
      bool: 'boolean',
      DateTime: 'Date',
      object: 'any',
    };
    return (typeMap[type] as PropertyType) || 'any';
  }

  private decapitalize(str: string): string {
    return str.charAt(0).toLowerCase() + str.slice(1);
  }
}
