import { Component, Host, h, Prop, State, Listen, Element } from '@stencil/core'
import { CmIconButton } from '../cm-icon-button/cm-icon-button'

export type DropdownOption =
	| {
			label: string
			title?: string
			isDangerous?: boolean
			isDisabled?: false
			handler: (event: { preventDismissal: () => void }) => void
	  }
	| {
			label: string
			title?: string
			isDangerous?: boolean
			isDisabled: true
			handler?: (event: { preventDismissal: () => void }) => void
	  }

export type DropdownOptionGroup = {
	title?: string
	options: Array<DropdownOption>
}

@Component({
	tag: 'cm-dropdown',
	styleUrl: 'cm-dropdown.scss',
	shadow: true,
})
export class CmDropdown {
	@Element() el: HTMLElement

	@Prop() trigger: { type: 'icon'; icon: CmIconButton['icon'] }

	@Prop() options: Array<DropdownOptionGroup>

	@State() shouldStayOpen = false
	@State() isOpen: boolean = false

	@Listen('blur') onBlur() {
		this.isOpen = false
	}

	private _renderOption(option: DropdownOption) {
		let optionClasses = {
			option: true,
			isDangerous: option.isDangerous ?? false,
			isDisabled: option.isDisabled ?? false,
		}

		return (
			<div
				class={optionClasses}
				onClick={() => {
					if (option.isDisabled) {
						return
					}

					option.handler({
						preventDismissal: () => {
							this.shouldStayOpen = true
						},
					})

					if (this.shouldStayOpen) {
						this.shouldStayOpen = false
					} else {
						this.isOpen = false

						setTimeout(() => {
							this.el.blur()
						}, 10)
					}
				}}
			>
				<div class="title">{option.title}</div>
				{option.label}
			</div>
		)
	}

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
						<div class="optionGroup">
							<div class="title">{option.title}</div>
							{option.options.map((option) => {
								return this._renderOption(option)
							})}
						</div>
					)
				})}
			</div>
		)

		return (
			<Host>
				<div class="container" tabindex="0">
					{trigger}
					{flyout}
				</div>
			</Host>
		)
	}
}
