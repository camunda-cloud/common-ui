import { Theme, ValidatorResult } from '../../globalHelpers';
import { CmIcon } from '../cm-icon/cm-icon';
export declare type InputType = 'text' | 'multiline' | 'email' | 'password';
export declare type FieldPrefix = {
  type: 'text';
  value: string;
} | {
  type: 'icon';
  icon: CmIcon['icon'];
} | {
  type: 'default';
};
export declare type FieldSuffix = {
  type: 'text';
  value: string;
} | {
  type: 'icon';
  icon: CmIcon['icon'];
} | {
  type: 'maxlength';
} | {
  type: 'copy';
} | {
  type: 'default';
};
export declare class CmTextfield {
  element: HTMLCmTextfieldElement;
  type: InputType;
  value: string;
  label: string;
  helperText: string;
  showRequired: boolean;
  placeholder: string;
  autocomplete: HTMLInputElement['autocomplete'];
  disabled: boolean;
  maxLength: number | undefined;
  fieldPrefix: FieldPrefix;
  fieldSuffix: FieldSuffix;
  required: boolean;
  validation: {
    type: 'default';
  } | {
    type: 'custom';
    validator: (value: string) => Promise<ValidatorResult>;
  };
  validationStyle: 'form' | 'live' | 'delay';
  formName: string;
  labelAlignment: 'horizontal' | 'vertical';
  isDirty: boolean;
  validationResult: ValidatorResult;
  showPassword: boolean;
  forceRenderingOfValidationState: boolean;
  forceHidingOfValidationState: boolean;
  theme: Theme;
  showCopyTooltip: boolean;
  delayedValidationTimer: ReturnType<typeof setTimeout>;
  delayValidationDistance: number;
  componentWillLoad(): void;
  getNormalisedInputType(): "email" | "text" | "password";
  reset(): Promise<void>;
  forceFocus(): Promise<void>;
  checkDefaultValidity(): ValidatorResult;
  checkValidity(): Promise<ValidatorResult>;
  renderValidity(): Promise<void>;
  hideValidity(): Promise<void>;
  resetValidationForces(): void;
  renderLabelContainer(): any;
  renderPrefix(): any;
  renderInputElement(): any;
  renderSuffix(): any;
  renderAsyncStatusIndicator(): any;
  renderErrorMessage(): any;
  render(): any;
}
