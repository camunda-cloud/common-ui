import { EventEmitter } from '../../stencil-public-runtime';
export declare class CmSelect {
  disabled: boolean;
  options: Array<{
    label: string;
    value: string;
  }>;
  /**
   * Emitted when the selected Option changes.
   */
  cmInput: EventEmitter<{
    newValue: string;
  }>;
  element: HTMLElement;
  /**
   * Selects an option based on the passed index. Respects the disabled state unless forced.
   */
  selectOptionByIndex(options: {
    forceSelection?: boolean;
    selectedIndex: number;
  }): Promise<void>;
  inputHandler(event: any): void;
  render(): any;
}
