import { ComponentInterface, EventEmitter } from '../../stencil-public-runtime';
import { CmIcon } from '../cm-icon/cm-icon';
export declare class CmIconButton implements ComponentInterface {
  icon: CmIcon['icon'];
  color: CmIcon['color'];
  disabled: boolean;
  ignoreTheme: boolean;
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
  render(): any;
}
