export declare type Theme = 'Light' | 'Dark';
export declare type ColorMap = Record<string, {
  Light: string;
  Dark: string;
}>;
export declare type ValidatorResult = {
  isValid: true;
} | {
  isValid: false;
  type: 'incomplete' | 'invalid';
  message: string;
};
export declare const onThemeChange: (callback: (theme: Theme) => void, options?: {
  runOnInit?: boolean;
}) => Promise<void>;
export declare const getVariableValueFromDocument: (name: string) => string;
export declare const getVariableValue: (name: string) => any;
