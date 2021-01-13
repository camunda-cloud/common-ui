/**
 * @slot - The default slot for the content of the Modal.
 * @slot cancel - Use this slot with a cm-button to provide an additional way of cancelling out of the modal
 * @slot confirm - Use this slot with a cm-button to provie a way of closing the modal with the Promise resolving to "confirm"
 */
export declare class CmModal {
  confirm: () => void;
  cancel: () => void;
  isOpen: boolean;
  headline: string;
  position: 'top' | 'center';
  el: HTMLElement;
  handleKeyDown(event: KeyboardEvent): void;
  open(): Promise<"cancel" | "confirm">;
  componentDidLoad(): void;
  render(): any;
}
