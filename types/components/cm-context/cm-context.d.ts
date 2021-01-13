import { EventEmitter } from '../../stencil-public-runtime';
import { Theme } from '../../globalHelpers';
export declare class CmContext {
  theme: Theme | 'Automatic';
  themeChanged: EventEmitter<{
    theme: Theme;
  }>;
  themeChangeHandler(): void;
  getResolvedTheme(): Promise<Theme>;
  private _getResolvedTheme;
  componentWillLoad(): void;
  render(): any;
}
