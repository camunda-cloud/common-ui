import { Component, Host, h, Prop, Method, State, Element } from '@stencil/core'

@Component({
	tag: 'cm-modal',
	styleUrl: 'cm-modal.scss',
	shadow: true,
})
export class CmModal {
	confirm: () => void
	cancel: () => void

	@State() isOpen: boolean = false
	@Prop() headline: string = ''
	@Element() el: HTMLElement

	@Method()
	open() {
		return new Promise<'confirm' | 'cancel'>((resolve) => {
			this.isOpen = true

			this.confirm = () => {
				this.isOpen = false
				resolve('confirm')
			}

			this.cancel = () => {
				this.isOpen = false
				resolve('cancel')
			}
		})
	}

	componentDidLoad() {
		let cancelSlot = this.el.shadowRoot.querySelector("slot[name='cancel']")
		let confirmSlot = this.el.shadowRoot.querySelector("slot[name='confirm']")

		cancelSlot.addEventListener('cmPress', () => {
			this.cancel()
		})

		confirmSlot.addEventListener('cmPress', () => {
			this.confirm()
		})
	}

	render() {
		let classes = {
			container: true,
			open: this.isOpen,
		}

		return (
			<Host>
				<div class={classes}>
					<div class="window">
						<div class="header">
							<h1>{this.headline}</h1>
							<div class="close" onClick={() => this.cancel()}></div>
						</div>
						<div class="content">
							<slot></slot>
						</div>
						<div class="buttons">
							<slot name="cancel"></slot>
							<slot name="confirm"></slot>
						</div>
					</div>
				</div>
			</Host>
		)
	}
}
