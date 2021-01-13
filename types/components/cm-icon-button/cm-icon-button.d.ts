import { ComponentInterface, EventEmitter } from '../../stencil-public-runtime';
export declare class CmIconButton implements ComponentInterface {
  icon: 'contextMenu' | 'close' | 'closeLarge' | 'search' | 'help' | 'information' | 'sort' | 'plus' | 'minus' | 'copy' | 'show' | 'hide' | 'edit' | 'delete' | 'up' | 'down' | 'left' | 'right';
  disabled: boolean;
  latestFocusWasClick: boolean;
  cmPress: EventEmitter<{}>;
  el: HTMLElement;
  handleMouseDown(event: MouseEvent): void;
  handleBlur(): void;
  handleClick(): void;
  handleKeyDown(event: KeyboardEvent): void;
  componentWillUpdate(): void;
  render(): any;
}
