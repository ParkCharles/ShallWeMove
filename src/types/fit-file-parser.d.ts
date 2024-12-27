declare module 'fit-file-parser' {
  export default class FitParser {
    constructor(options?: { force: boolean; speedUnit: string; lengthUnit: string });
    parse(content: ArrayBuffer, callback: (error: any, data: any) => void): void;
  }
} 