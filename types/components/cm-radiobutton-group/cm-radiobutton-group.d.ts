export declare class CmRadiobuttonGroup {
  label: string;
  value: string;
  formName: string;
  element: HTMLElement;
  radiobuttons: Array<HTMLCmRadiobuttonElement>;
  setValue(newValue: string): void;
  radioButtonSelectedHandler(event: any): void;
  selectRadiobutton(value: string): void;
  componentDidLoad(): void;
  render(): any;
}
