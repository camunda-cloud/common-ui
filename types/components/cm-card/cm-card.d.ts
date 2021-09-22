import { EventEmitter } from '../../stencil-public-runtime';
/**
 * @slot header - Use this slot to display Icons, Headlines or small Buttons. The container of this slot is `display: grid`, so `justify-self` allows horizontal positioning.
 * @slot - The default slot for the general content of the Card.
 * @slot footer - Use this slot for small buttons or links. The spacing to the default slot collapses, if this slot is empty. The container of this slot is `display: grid`, so `justify-self` allows horizontal positioning.
 */
export declare class CmCard {
  /**
   * Adds a Dismiss-Button to the Card, which fires the `cmDismissed` Event when pressed.
   */
  isDismissable: boolean;
  element: HTMLCmCardElement;
  hasFooterContent: boolean;
  /**
   * Emitted when the Card is being dismissed. Has no default action.
   */
  cmDismissed: EventEmitter<{}>;
  componentDidRender(): void;
  componentDidLoad(): void;
  render(): any;
}
