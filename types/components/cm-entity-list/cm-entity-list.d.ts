import { CmDropdown, DropdownOptionGroup } from '../cm-dropdown/cm-dropdown';
export declare type SortingDescription = {
  columnIndex: number;
  method: 'ascending' | 'descending';
};
export declare type Entity = {
  onPress?: () => void;
  data: Array<{
    type: 'text';
    content: string;
    showCopyButton?: boolean;
  } | {
    type: 'image';
    src: string;
  } | {
    type: 'button';
    label: string;
    onPress: () => void;
  } | {
    type: 'contextMenu';
    options: CmDropdown['options'];
  }>;
  meta?: unknown;
};
export declare class CmEntityList {
  enableCreateButton: boolean;
  loading: boolean;
  headline: string;
  createButtonLabel: string;
  createHandler: () => void;
  columns: Array<{
    name: string;
    width: string;
    ellipsis?: 'off' | 'left' | 'right';
    overrideCSS?: Record<string, string>;
  }>;
  entities: Array<Entity>;
  groupOptions: Array<DropdownOptionGroup>;
  defaultSorting?: SortingDescription;
  addScrollPadding?: boolean;
  userSelectedSorting?: SortingDescription;
  selectedEntities: Array<Entity>;
  isSearchOpen: boolean;
  filter: string;
  entitiesAreScrolled: boolean;
  element: HTMLElement;
  componentDidUpdate(): void;
  /**
   * Triggers an option of entity at the given index as if selected by the user, if available. Note that the entity index is based of the entity array and ignores all sorting.
   */
  triggerEntityOption(options: {
    entityIndex: number;
    optionGroupIndex: number;
    optionIndex: number;
  }): Promise<void>;
  /**
   * Triggers an option of the group-actions-dropdown as if selected by the user, if available. Needs selected entities to function.
   */
  triggerGroupOption(optionGroupIndex: number, optionIndex: number): Promise<void>;
  /**
   * Selects all entities.
   */
  selectAll(): Promise<void>;
  /**
   * De-selects all entities.
   */
  deselectAll(): Promise<void>;
  /**
   * Selects the entity at the given index. Note that the index is based of the entity array and ignores all sorting.
   */
  selectIndex(index: number): Promise<void>;
  /**
   * De-selects the entity at the given index. Note that the index is based of the entity array and ignores all sorting.
   */
  deselectIndex(index: number): Promise<void>;
  render(): any;
}
