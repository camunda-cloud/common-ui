import { Theme } from '../../globalHelpers';
export declare class CmIcon {
  icon: 'check' | 'close' | 'closeLarge' | 'contextMenu' | 'copy' | 'delete' | 'document' | 'down' | 'edit' | 'email' | 'external' | 'help' | 'hide' | 'information' | 'left' | 'minus' | 'plus' | 'right' | 'search' | 'show' | 'sort' | 'stop' | 'up' | 'warning';
  color: 'bright' | 'medium' | 'dark' | 'success' | 'warning' | 'danger';
  ignoreTheme: boolean;
  theme: Theme;
  resolvedColor: string;
  colorWatch(): void;
  componentWillLoad(): void;
  getResolvedColorName(): string;
  getIconSVG(): any;
  render(): any;
}
