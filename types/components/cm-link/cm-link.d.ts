import { ComponentInterface } from '../../stencil-public-runtime';
import { Theme } from '../../globalHelpers';
export declare class CmLink implements ComponentInterface {
  href: string;
  label: string;
  openIn: 'sameTab' | 'newTab';
  theme: Theme;
  componentWillLoad(): void;
  render(): any;
}
