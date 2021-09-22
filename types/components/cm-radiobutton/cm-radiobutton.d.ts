import { EventEmitter } from '../../stencil-public-runtime';
export declare class CmRadiobutton {
  value: string;
  label: string;
  helperText: string;
  selected: boolean;
  disabled: boolean;
  element: HTMLElement;
  /**
   * Emitted whenever the selected state changes.
   */
  cmSelected: EventEmitter<{
    value: string;
    triggeredBy: 'User' | 'API';
  }>;
  radiobutton: HTMLDivElement;
  handleKeyDown(event: KeyboardEvent): void;
  handleClick(): void;
  /**
   * Sets the selected state to true. Respects the disabled state, unless forced.
   */
  select(options?: {
    forceSelection?: boolean;
    triggeredBy?: 'User' | 'API';
  }): Promise<void>;
  render(): any;
}
