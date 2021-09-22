import { EventEmitter } from '../../stencil-public-runtime';
import { ValidatorResult } from '../../globalHelpers';
export declare class CmCheckbox {
  element: HTMLCmCheckboxElement;
  label: string;
  helperText: string;
  checked: boolean;
  indeterminate: boolean;
  disabled: boolean;
  required: boolean;
  formName: string;
  validationResult: ValidatorResult;
  forceRenderingOfValidationState: boolean;
  forceHidingOfValidationState: boolean;
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
  checkbox: HTMLDivElement;
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
  reset(): Promise<void>;
  forceFocus(): Promise<void>;
  checkValidity(): Promise<ValidatorResult>;
  renderValidity(): Promise<void>;
  hideValidity(): Promise<void>;
  resetValidationForces(): void;
  renderErrorMessage(): any;
  render(): any;
}
