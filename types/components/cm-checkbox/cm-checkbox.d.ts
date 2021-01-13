import { EventEmitter } from '../../stencil-public-runtime';
export declare class CmCheckbox {
  label: string;
  checked: boolean;
  indeterminate: boolean;
  disabled: boolean;
  cmInput: EventEmitter<{
    isChecked: boolean;
  }>;
  latestFocusWasClick: boolean;
  checkbox: HTMLDivElement;
  handleKeyDown(event: KeyboardEvent): void;
  handleMouseDown(event: MouseEvent): void;
  handleClick(): void;
  toggleCheck(): void;
  componentWillUpdate(): void;
  render(): any;
}
