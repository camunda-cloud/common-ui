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
  showCreationTime?: boolean;
  createdAt: number;
};
export declare class CmNotificationContainer {
  el: HTMLElement;
  notificationQueue: Array<NotificationItem>;
  notificationMap: Map<NotificationItem, HTMLCmNotificationElement>;
  visibleNotifications: Array<HTMLCmNotificationElement>;
  durationStore: Map<HTMLCmNotificationElement, number>;
  maxVisibleNotifications: number;
  notificationDuration: number;
  /**
   * Queues a Notification to be shown. The notification might be shown instantly, if there is space, or later, once space is available.
   */
  enqueueNotification(notification: Omit<NotificationItem, 'createdAt'>): Promise<{
    hasBeenShown(): boolean;
    remove(): void;
  }>;
  componentDidLoad(): void;
  countTimerDown(expiredTime: number): Promise<void>;
  private renderNewNotification;
  render(): any;
}
