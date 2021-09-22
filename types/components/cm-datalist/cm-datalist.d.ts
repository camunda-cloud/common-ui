export declare class CmDatalist {
  headline: string;
  /**
   * Sets the width of the label for all cm-datalist-item's inside this cm-datalist. Expected format is a valid CSS Grid Column value.
   */
  labelWidth: string;
  element: HTMLCmDatalistElement;
  componentDidLoad(): void;
  updateItemLabelWidth(): void;
  render(): any;
}
