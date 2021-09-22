import { Theme } from '../../globalHelpers';
/**
 * @slot - The default slot is meant for the text you want to display.
 */
export declare class CmText {
  color: 'bright' | 'subtle';
  appearance: 'normal' | 'emphasis' | 'helperText' | 'entityListItem' | 'entityListName';
  theme: Theme;
  componentWillLoad(): void;
  render(): any;
}
