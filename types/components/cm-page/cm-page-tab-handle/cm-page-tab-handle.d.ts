import { EventEmitter } from '../../../stencil-public-runtime';
export declare class CmPageTabHandle {
  root: HTMLCmPageTabHandleElement;
  span: HTMLSpanElement;
  label: string;
  private readonly defaultActive;
  active: boolean;
  activeWatchHandler(newValue: boolean): void;
  /**
   * Emitted when the Tab is being selected by the user.
   */
  userSelectedTab: EventEmitter<{
    originalEvent: MouseEvent | KeyboardEvent;
    handle: HTMLCmPageTabHandleElement;
    label: string;
  }>;
  clickEventHandler(event: MouseEvent): void;
  handleKeyDown(event: KeyboardEvent): void;
  componentWillRender(): void;
  render(): any;
}
