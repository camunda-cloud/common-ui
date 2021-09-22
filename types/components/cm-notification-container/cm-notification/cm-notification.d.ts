import { EventEmitter } from '../../../stencil-public-runtime';
import { Theme } from '../../../globalHelpers';
import { CmIcon } from '../../cm-icon/cm-icon';
export declare class CmNotification {
  appearance: 'success' | 'error' | 'info';
  headline: string;
  description: string;
  navigationLabel: string;
  userDismissable: boolean;
  showCreationTime: boolean;
  createdAt: number;
  elapsedTime: number;
  private timer;
  iconColor: CmIcon['color'];
  el: HTMLElement;
  /**
   * Emitted when the Notification is dismissed.
   */
  cmDismissed: EventEmitter<{}>;
  /**
   * Emitted when the Navigation is triggered.
   */
  cmNotificationNavigation: EventEmitter<{}>;
  /**
   * Emitted when Component has loaded, used as a workaround for the lack of a general 'componentDidLoad' event internally. You should not rely on this event.
   */
  didLoad: EventEmitter<{}>;
  theme: Theme;
  /**
   * Dismisses the Notification.
   */
  dismiss(): Promise<void>;
  protected _isBeingHovered: boolean;
  /**
   * Returns the hover state. This is being used to halt Notification-Timeouts.
   */
  isBeingHovered(): Promise<boolean>;
  componentWillLoad(): void;
  componentDidLoad(): void;
  disconnectedCallback(): void;
  render(): any;
}
