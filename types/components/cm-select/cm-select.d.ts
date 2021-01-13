import { EventEmitter } from '../../stencil-public-runtime';
export declare class CmSelect {
  disabled: boolean;
  options: Array<{
    label: string;
    value: string;
  }>;
  element: HTMLElement;
  cmInput: EventEmitter<{
    newValue: string;
  }>;
  inputHandler(): void;
  render(): any;
}
