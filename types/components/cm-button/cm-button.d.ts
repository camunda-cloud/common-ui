import { ComponentInterface, EventEmitter } from '../../stencil-public-runtime';
import { Theme } from '../../globalHelpers';
export declare class CmButton implements ComponentInterface {
  appearance: 'main' | 'primary' | 'secondary' | 'danger' | 'link';
  label: string;
  size: 'small' | 'normal';
  disabled: boolean;
  disabledHandler(): void;
  /**
   * The loading state displays a spinner and effectively disables the button to user input. Does not affect buttons with the `link` appearance.
   */
  loading: boolean;
  theme: Theme;
  initialRender: boolean;
  /**
   * Emitted when the button is pressed or either Spacebar or Enter are being pressed when the button is focused.
   */
  cmPress: EventEmitter<{}>;
  el: HTMLElement;
  /**
   * Triggers the press event. Respects the disabled state unless forced.
   */
  press(options?: {
    forcePress?: boolean;
  }): Promise<void>;
  handleClick(): void;
  handleKeyDown(event: KeyboardEvent): void;
  componentWillLoad(): void;
  componentDidRender(): void;
  render(): any;
}
