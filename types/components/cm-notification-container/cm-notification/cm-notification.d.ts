import { EventEmitter } from '../../../stencil-public-runtime';
import { Theme } from '../../../globalHelpers';
export declare class CmNotification {
  appearance: 'success' | 'error' | 'info';
  headline: string;
  description: string;
  navigationLabel: string;
  userDismissable: boolean;
  el: HTMLElement;
  cmDismissed: EventEmitter<{}>;
  didLoad: EventEmitter<{}>;
  cmNotificationNavigation: EventEmitter<{}>;
  theme: Theme;
  dismiss(): Promise<void>;
  protected _isBeingHovered: boolean;
  isBeingHovered(): Promise<boolean>;
  componentWillLoad(): void;
  componentDidLoad(): void;
  render(): any;
}
