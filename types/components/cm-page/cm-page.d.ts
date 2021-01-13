import { EventEmitter } from '../../stencil-public-runtime';
export declare type State = {
  label: string;
  tab: HTMLCmPageTabElement;
  handle: HTMLCmPageTabHandleElement;
};
/**
 * @slot - The default slot only accepts `CmPageTabs`.
 * @slot header - Use this slot to display a headline for the page or page wide context menus.
 */
export declare class CmPage {
  root: HTMLCmPageElement;
  private tabRefs;
  private labelToTabMap;
  private labelToHandleMap;
  private labels;
  activeLabel: string;
  activeTitleWatchHandler(newValue: any, oldValue: any): void;
  /**
   * This is emitted when the active tab is changed.
   */
  tabChanged: EventEmitter<State>;
  tabModifiedEventHandler(): void;
  userSelectedTabHandler(event: CustomEvent<{
    originalEvent: MouseEvent;
    handle: HTMLCmPageTabHandleElement;
    label: string;
  }>): void;
  /**
   * Returns the currently active tab, handle, and title.
   */
  getActiveState(): Promise<State>;
  /**
   * Switches to a tab based on their label.
   * @param label Title of the target tab.
   */
  switchToTab(label: string): Promise<void>;
  /**
   * Switches to a tab based on their index.
   * @param index Index of the target tab.
   */
  switchToTabIndex(index: number): Promise<void>;
  onChildrenChange(): void;
  parseTabList(): void;
  componentDidLoad(): void;
  componentWillRender(): Promise<void>;
  render(): any;
}
