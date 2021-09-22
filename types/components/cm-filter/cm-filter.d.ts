import { EventEmitter } from '../../stencil-public-runtime';
export declare class CmFilter {
  filters: Array<{
    label: string;
    value: string;
    title?: string;
    disabled?: boolean;
  }>;
  /**
   * The Index of the active filter.
   */
  activeFilterIndex: number;
  /**
   * Emitted whenever the selected filter changes.
   */
  cmFilterSelected: EventEmitter<{
    value: string;
  }>;
  render(): any;
}
