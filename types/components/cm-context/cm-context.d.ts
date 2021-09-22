import { EventEmitter } from '../../stencil-public-runtime';
import { Theme } from '../../globalHelpers';
export declare class CmContext {
  variableCache: Map<string, string>;
  theme: Theme | 'Automatic';
  /**
   * Emitted when the resolved theme changes.
   */
  themeChanged: EventEmitter<{
    theme: Theme;
  }>;
  themeChangeHandler(): void;
  /**
   * Returns the Value of the requested variable, caching it in the process.
   */
  getVariableValue(name: string): Promise<string>;
  /**
   * Returns the actual theme, resolving "Automatic" to an actual value.
   */
  getResolvedTheme(): Promise<Theme>;
  _getResolvedTheme(): Theme;
  componentWillLoad(): void;
  render(): any;
}
