import {
	Component,
	ComponentInterface,
	Host,
	h,
	Prop,
	Element,
} from '@stencil/core'

/**
 * @slot - Content is placed in the Content-Area of the card if provided without a slot.
 * @slot headline - Should be used to place items on the right hand side of the headline.
 */
@Component({
	tag: 'cm-card',
	styleUrl: 'card.scss',
	shadow: true,
})
export class Card implements ComponentInterface {
	@Prop() headline: string = ''
	@Prop() simple: boolean = false

	@Element() element: HTMLElement

	isUsingHeadlineSlot: boolean

	componentWillLoad() {
		this.isUsingHeadlineSlot = !!this.element.querySelector('[slot="headline"]')
	}

	render() {
		let typeClass = 'complex'
		let headlineContainerClasses = {
			headlineContainer: true,
			empty: false,
		}

		if (this.simple) {
			typeClass = 'simple'
		}

		if (!this.isUsingHeadlineSlot && this.headline.length === 0) {
			headlineContainerClasses.empty = true
		}

		return (
			<Host>
				<div class={typeClass}>
					<div class={headlineContainerClasses}>
						<span class="headline">{this.headline}</span>
						<div class="headlineSlot">
							<slot name="headline"></slot>
						</div>
					</div>
					<div class="content">
						<slot />
					</div>
				</div>
			</Host>
		)
	}
}
