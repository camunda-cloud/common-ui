import { Component, Host, h, Prop, State } from '@stencil/core'
import { CmIconButton } from '../cm-icon-button/cm-icon-button'

@Component({
	tag: 'cm-dropdown',
	styleUrl: 'cm-dropdown.scss',
	shadow: true,
})
export class CmDropdown {
	@Prop() trigger: { type: 'icon'; icon: CmIconButton['icon'] }

	@Prop() options: Array<{
		label: string
		handler: (event: { preventDismissal: () => void }) => void
	}>
	// | Array<Array<{ label: string; value: string }>>

	@State() isOpen: boolean = false

	render() {
		let flyoutClasses = {
			flyout: true,
			open: this.isOpen,
		}
		let trigger: any, flyout: any

		if (this.trigger.type === 'icon') {
			trigger = (
				<div class="trigger">
					<cm-icon-button
						icon={this.trigger.icon}
						onCmPress={() => {
							this.isOpen = !this.isOpen
						}}
					/>
				</div>
			)
		}

		flyout = (
			<div class={flyoutClasses}>
				{this.options.map((option) => {
					return (
						<div
							class="option"
							onClick={() => {
								let dismiss = true
								option.handler({
									preventDismissal: () => {
										dismiss = false
									},
								})

								if (dismiss) {
									this.isOpen = false
								}
							}}
						>
							{option.label}
						</div>
					)
				})}
			</div>
		)

		return (
			<Host>
				<div class="container">
					{trigger}
					{flyout}
				</div>
			</Host>
		)
	}
}
