import { EventEmitter } from '../../../stencil-public-runtime';
export declare class CmPageTab {
  root: HTMLCmPageTabElement;
  /**
   * Emitted when the Tab is modified, e.g. when the label is changed.
   */
  tabModified: EventEmitter;
  label: string;
  labelWatchHandler(): void;
  private readonly defaultActive;
  active: boolean;
  activeWatchHandler(newValue: boolean): void;
  componentWillRender(): void;
  render(): any;
}
