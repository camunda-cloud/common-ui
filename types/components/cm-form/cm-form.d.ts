import { EventEmitter } from '../../stencil-public-runtime';
export declare class CmForm {
  element: HTMLFormElement;
  cmSubmit: EventEmitter<{
    data: Record<string, string>;
  }>;
  keyupHandler(event: KeyboardEvent): void;
  attemptSubmit(): Promise<{
    isValid: true;
    data: Record<string, string>;
  } | {
    isValid: false;
  }>;
  reset(): Promise<void>;
  forceFocus(): Promise<void>;
  render(): any;
}
