export declare type Theme = 'Light' | 'Dark';
export declare const onThemeChange: (callback: (theme: Theme) => void, options?: {
  runOnInit?: boolean;
}) => Promise<void>;
