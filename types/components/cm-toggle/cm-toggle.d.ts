import { EventEmitter } from '../../stencil-public-runtime';
export declare class CmToggle {
  label: string;
  checked: boolean;
  disabled: boolean;
  cmInput: EventEmitter<{
    isChecked: boolean;
  }>;
  latestFocusWasClick: boolean;
  toggle: HTMLDivElement;
  handleKeyDown(event: KeyboardEvent): void;
  handleMouseDown(event: MouseEvent): void;
  handleClick(): void;
  toggleCheck(): void;
  componentWillUpdate(): void;
  render(): any;
}
