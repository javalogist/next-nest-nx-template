// Core structure for Intermediate Format
export interface IntermediateFormat {
  className: string;
  properties: ModelProperty[];
}

// Property structure in Intermediate Format
export interface ModelProperty {
  name: string;
  type: PropertyType;
  isOptional?: boolean;
}

// Property Type for primitive, array, and object types
export type PropertyType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'Date'
  | 'any'
  | ArrayType
  | ObjectType;

// Array Type (e.g., string[], number[], etc.)
export interface ArrayType {
  type: PropertyType;
  isArray: true;
}

// Object Type (nested objects)
export interface ObjectType {
  properties: ModelProperty[];
}

// Base Parser Class
export abstract class BaseParser {
  abstract parse(model: string): IntermediateFormat;
}
