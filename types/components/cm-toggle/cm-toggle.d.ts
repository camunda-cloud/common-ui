import { EventEmitter } from '../../stencil-public-runtime';
export declare class CmToggle {
  label: string;
  checked: boolean;
  disabled: boolean;
  /**
   * Enables `cmInput` Events being emitted when the checked attribute changes.
   */
  enableAttributeEmit: boolean;
  checkedChangeHandler(): void;
  /**
   * Emitted whenever the checked state changes.
   */
  cmInput: EventEmitter<{
    isChecked: boolean;
    triggeredBy: 'User' | 'API';
  }>;
  toggle: HTMLDivElement;
  handleKeyDown(event: KeyboardEvent): void;
  handleClick(): void;
  /**
   * Toggles the checked state. Respects the disabled state, unless forced.
   */
  toggleCheck(options?: {
    forceToggle?: boolean;
    triggeredBy?: 'User' | 'API';
  }): Promise<void>;
  /**
   * Sets the checked state to true. Respects the disabled state, unless forced.
   */
  check(options?: {
    forceCheck?: boolean;
    triggeredBy?: 'User' | 'API';
  }): Promise<void>;
  /**
   * Sets the checked state to false. Respects the disabled state, unless forced.
   */
  uncheck(options?: {
    forceUncheck?: boolean;
    triggeredBy?: 'User' | 'API';
  }): Promise<void>;
  render(): any;
}
