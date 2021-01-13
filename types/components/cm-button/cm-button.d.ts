import { ComponentInterface, EventEmitter } from '../../stencil-public-runtime';
import { Theme } from '../../globalHelpers';
export declare class CmButton implements ComponentInterface {
  appearance: 'main' | 'primary' | 'secondary' | 'danger' | 'link';
  label: string;
  disabled: boolean;
  latestFocusWasClick: boolean;
  theme: Theme;
  cmPress: EventEmitter<{}>;
  el: HTMLElement;
  handleMouseDown(event: MouseEvent): void;
  handleBlur(): void;
  handleClick(): void;
  handleKeyDown(event: KeyboardEvent): void;
  componentWillLoad(): void;
  componentWillUpdate(): void;
  render(): any;
}
