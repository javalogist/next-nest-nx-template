import { Injectable } from '@nestjs/common';
import { TypeScriptParser } from './parsers/typescript.parser';
import { CSharpSerializer } from './serializers/csharp.serializer';
import { IntermediateFormat } from './utils/base.parser';
import { CSharpParser } from './parsers/csharp.parser';
import { TypeScriptSerializer } from './serializers/typescript.serializer';

@Injectable()
export class ModelTransformerService {
  private parsers: Record<string, any> = {
    typescript: new TypeScriptParser(),
    csharp: new CSharpParser(),
  };

  private serializers: Record<string, any> = {
    typescript: new TypeScriptSerializer(),
    csharp: new CSharpSerializer(),
  };

  // Get available languages dynamically
  getAvailableLanguages(): { from: string[]; to: string[] } {
    return {
      from: Object.keys(this.parsers), // Available source languages
      to: Object.keys(this.serializers), // Available target languages
    };
  }

  // Convert from one language to another using Intermediate Format
  convert(schema: string, from: string, to: string): string {
    if (!this.parsers[from]) {
      throw new Error(`Unsupported source language: ${from}`);
    }
    if (!this.serializers[to]) {
      throw new Error(`Unsupported target language: ${to}`);
    }

    // Parse to Intermediate Format
    const intermediateFormat: IntermediateFormat =
      this.parsers[from].parse(schema);

    // Serialize to target language
    return this.serializers[to].serialize(intermediateFormat);
  }
}
