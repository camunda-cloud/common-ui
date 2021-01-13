export declare type NotificationItem = {
  headline: string;
  description?: string;
  appearance?: 'success' | 'error' | 'info';
  userDismissable?: boolean;
  duration?: number;
  navigation?: {
    label: string;
    navigationHandler: (event: CustomEvent<{}>) => void;
  };
};
export declare class CmNotificationContainer {
  el: HTMLElement;
  notificationQueue: Array<NotificationItem>;
  notificationMap: Map<NotificationItem, HTMLCmNotificationElement>;
  visibleNotifications: Array<HTMLCmNotificationElement>;
  durationStore: Map<HTMLCmNotificationElement, number>;
  maxVisibleNotifications: number;
  notificationDuration: number;
  enqueueNotification(notification: NotificationItem): Promise<{
    hasBeenShown(): boolean;
    remove(): void;
  }>;
  componentDidLoad(): void;
  countTimerDown(expiredTime: number): Promise<void>;
  private renderNewNotification;
  render(): any;
}
