import { CmIconButton } from '../cm-icon-button/cm-icon-button';
export declare type DropdownOption = {
  label: string;
  title?: string;
  isDangerous?: boolean;
  isDisabled?: false;
  handler: (event: {
    preventDismissal: () => void;
  }) => void;
} | {
  label: string;
  title?: string;
  isDangerous?: boolean;
  isDisabled: true;
  handler?: (event: {
    preventDismissal: () => void;
  }) => void;
};
export declare type DropdownOptionGroup = {
  title?: string;
  options: Array<DropdownOption>;
};
export declare class CmDropdown {
  el: HTMLElement;
  trigger: {
    type: 'icon';
    icon: CmIconButton['icon'];
  } | {
    type: 'button';
    label: string;
    appearance: 'main' | 'primary' | 'secondary';
  } | {
    type: 'defaultAction';
    label: string;
    appearance: 'main' | 'primary' | 'secondary';
    defaultHandler: () => void;
  } | {
    type: 'label';
    label: string;
  };
  options: Array<DropdownOptionGroup>;
  shouldStayOpen: boolean;
  isOpen: boolean;
  triggerOption(option: DropdownOption): void;
  /**
   * Opens the Dropdown.
   */
  open(): Promise<void>;
  /**
   * Closes the Dropdown.
   */
  close(): Promise<void>;
  /**
   * Triggers an option, as if selected by the user. The Dropdown is _not_ required to be open for this to work.
   */
  triggerOptionByIndex(optionGroupIndex: number, optionIndex: number): Promise<void>;
  onBlur(): void;
  private _renderOption;
  render(): any;
}
