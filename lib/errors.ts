// Minimal error handling for music curation app
export type ErrorCode = 
  | 'bad_request:database'
  | 'not_found:database'
  | 'offline:chat'
  | 'unauthorized';

export class ChatSDKError extends Error {
  public readonly code: ErrorCode;
  public readonly cause?: string;

  constructor(code: ErrorCode, cause?: string) {
    super(`${code}: ${cause || 'Unknown error'}`);
    this.name = 'ChatSDKError';
    this.code = code;
    this.cause = cause;
  }
}
