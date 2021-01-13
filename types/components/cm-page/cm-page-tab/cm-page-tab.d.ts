import { EventEmitter } from '../../../stencil-public-runtime';
export declare class CmPageTab {
  root: HTMLCmPageTabElement;
  tabModified: EventEmitter;
  label: string;
  labelWatchHandler(): void;
  private readonly defaultActive;
  active: boolean;
  activeWatchHandler(newValue: boolean): void;
  componentWillRender(): void;
  render(): any;
}
