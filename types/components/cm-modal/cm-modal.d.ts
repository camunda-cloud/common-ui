export declare class CmModal {
  promise?: Promise<{
    result: 'confirm';
    formData?: Record<string, string>;
  } | {
    result: 'cancel';
  }>;
  promiseResolver?: (value: {
    result: 'confirm';
    formData?: Record<string, string>;
  } | {
    result: 'cancel';
  }) => void;
  preConfirmationHandler?: () => Promise<void>;
  isOpen: boolean;
  confirmLoading: boolean;
  cancelDisabled: boolean;
  position: 'top' | 'center';
  width: number;
  paddings: 'all' | 'vertical' | 'horizontal' | 'none';
  headline: string;
  confirmLabel: string;
  confirmAppearance: 'primary' | 'danger' | 'secondary';
  confirmDisabled: boolean;
  cancelLabel: string;
  cancelAppearance: 'secondary' | 'danger';
  element: HTMLElement;
  handleKeyDown(event: KeyboardEvent): void;
  submitFromConfirm: boolean;
  /**
   * Opens the modal. Takes an optional handler for asynchronous confirm actions, which only trigger confirm if the returned Promise resolves successfully. While the Promise is unresolved, the Modal stays open and the ConfirmButton is in a loading state.
   */
  open(options?: {
    preConfirmationHandler?: () => Promise<void>;
    preventFormReset?: boolean;
  }): Promise<{
    result: "confirm";
    formData?: Record<string, string>;
  } | {
    result: "cancel";
  }>;
  /**
   * Triggers the 'confirm' action on the modal, if it is open.
   */
  confirm(): Promise<{
    result: "confirm";
    formData?: Record<string, string>;
  } | {
    result: "cancel";
  }>;
  /**
   * Triggers the 'cancel' action on the modal, if it is open.
   */
  cancel(): Promise<{
    result: "confirm";
    formData?: Record<string, string>;
  } | {
    result: "cancel";
  }>;
  render(): any;
}
