// // src/utils/pipes/sanitize.pipe.ts
// import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
//
// @Injectable()
// export class SanitizePipe implements PipeTransform {
//   transform(value: any, metadata: ArgumentMetadata) {
//     if (typeof value === 'string') {
//       return sanitizeHtml(value, {
//         allowedTags: [], // No HTML allowed
//         allowedAttributes: {}
//       });
//     }
//     return value;
//   }
// }
