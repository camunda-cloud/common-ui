import { EventEmitter } from '../../../stencil-public-runtime';
export declare class CmPageTabHandle {
  root: HTMLCmPageTabHandleElement;
  span: HTMLSpanElement;
  latestFocusWasClick: boolean;
  label: string;
  private readonly defaultActive;
  active: boolean;
  activeWatchHandler(newValue: boolean): void;
  userSelectedTab: EventEmitter<{
    originalEvent: MouseEvent | KeyboardEvent;
    handle: HTMLCmPageTabHandleElement;
    label: string;
  }>;
  clickEventHandler(event: MouseEvent): void;
  handleKeyDown(event: KeyboardEvent): void;
  handleMouseDown(event: MouseEvent): void;
  handleBlur(): void;
  componentWillUpdate(): void;
  componentWillRender(): void;
  render(): any;
}
