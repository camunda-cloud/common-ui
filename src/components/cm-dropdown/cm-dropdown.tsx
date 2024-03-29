import {
	Component,
	Host,
	h,
	Prop,
	State,
	Listen,
	Element,
	Method,
} from '@stencil/core'
import { CmIconButton } from '../cm-icon-button/cm-icon-button'
import {
	onThemeChange,
	Theme,
	transformDataAttributes,
} from '../../globalHelpers'

export type DropdownOption =
	| {
			label: string
			title?: string
			isDangerous?: boolean
			isDisabled?: false
			dataAttributes?: Record<string, string>
			handler: (event: { preventDismissal: () => void }) => void
	  }
	| {
			label: string
			title?: string
			isDangerous?: boolean
			isDisabled: true
			dataAttributes?: Record<string, string>
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

	@Prop({ mutable: true }) trigger:
		| {
				type: 'icon'
				icon: CmIconButton['icon']
				dataAttributes?: Record<string, string>
		  }
		| {
				type: 'button'
				label: string
				appearance: 'main' | 'primary' | 'secondary'
				dataAttributes?: Record<string, string>
		  }
		| {
				type: 'defaultAction'
				label: string
				appearance: 'main' | 'primary' | 'secondary'
				dataAttributes?: Record<string, string>
				defaultHandler: () => void
		  }
		| {
				type: 'label'
				label: string
				dataAttributes?: Record<string, string>
		  } = {
		type: 'button',
		label: '',
		appearance: 'main',
	}

	@Prop({ mutable: true }) options: Array<DropdownOptionGroup> = []

	@State() shouldStayOpen = false
	@State() isOpen: boolean = false
	@State() theme: Theme = 'Light'

	componentWillLoad() {
		onThemeChange((theme) => {
			this.theme = theme
		})
	}

	triggerOption(option: DropdownOption) {
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
	}

	/**
	 * Opens the Dropdown.
	 */
	@Method()
	async open() {
		this.isOpen = true
	}

	/**
	 * Closes the Dropdown.
	 */
	@Method()
	async close() {
		this.isOpen = false
	}

	/**
	 * Triggers an option, as if selected by the user. The Dropdown is _not_ required to be open for this to work.
	 */
	@Method()
	async triggerOptionByIndex(optionGroupIndex: number, optionIndex: number) {
		this.triggerOption(this.options[optionGroupIndex].options[optionIndex])
	}

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
				onMouseDown={(event) => {
					event.preventDefault()
				}}
				onClick={() => {
					this.triggerOption(option)
				}}
				{...transformDataAttributes(option.dataAttributes)}
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
		if (this.trigger) {
			if (this.trigger.type === 'label') {
				trigger = (
					<div
						class="trigger"
						onClick={() => {
							this.isOpen = !this.isOpen
						}}
						onKeyDown={(event) => {
							if (event.key === ' ' || event.key === 'Enter') {
								this.isOpen = !this.isOpen
							}
						}}
						{...transformDataAttributes(
							this.trigger.dataAttributes,
						)}
					>
						<div class="label" tabindex="0">
							<div class="text">{this.trigger.label}</div>
							<cm-icon icon="down" />
						</div>
					</div>
				)
			} else if (this.trigger.type === 'icon') {
				trigger = (
					<div
						class="trigger"
						{...transformDataAttributes(
							this.trigger.dataAttributes,
						)}
					>
						<cm-icon-button
							icon={this.trigger.icon}
							onCmPress={() => {
								this.isOpen = !this.isOpen
							}}
							ignoreTheme
						/>
					</div>
				)
			} else if (this.trigger.type === 'defaultAction') {
				let buttonClasses = {
					defaultAction: true,
					[this.trigger.appearance]: true,
				}

				let iconColor

				if (this.trigger.appearance === 'primary') {
					iconColor = 'bright'
				} else {
					iconColor = 'dark'
				}

				const defaultAction = this.trigger.defaultHandler

				trigger = (
					<div
						class="trigger"
						{...transformDataAttributes(
							this.trigger.dataAttributes,
						)}
					>
						<div class={buttonClasses}>
							<div
								tabindex="0"
								class={{
									button: true,
									[this.trigger.appearance]: true,
								}}
								onClick={() => {
									this.isOpen = false
									defaultAction()
								}}
							>
								{this.trigger.label}
							</div>
							<div
								class={{
									separator: true,
									[this.trigger.appearance]: true,
								}}
							></div>
							<div
								tabindex="0"
								class={{
									iconButton: true,
									[this.trigger.appearance]: true,
								}}
								onClick={() => {
									this.isOpen = !this.isOpen
								}}
								onKeyDown={(event) => {
									if (
										event.key === ' ' ||
										event.key === 'Enter'
									) {
										this.isOpen = !this.isOpen
									}
								}}
							>
								<cm-icon
									icon="down"
									color={iconColor}
									ignoreTheme
								></cm-icon>
							</div>
						</div>
					</div>
				)
			} else {
				let buttonClasses = {
					button: true,
					[this.trigger.appearance]: true,
				}

				let iconColor

				if (this.trigger.appearance === 'primary') {
					iconColor = 'bright'
				} else {
					iconColor = 'dark'
				}

				trigger = (
					<div
						class="trigger"
						{...transformDataAttributes(
							this.trigger.dataAttributes,
						)}
					>
						<div
							tabindex="0"
							class={buttonClasses}
							onClick={() => {
								this.isOpen = !this.isOpen
							}}
							onKeyDown={(event) => {
								if (
									event.key === ' ' ||
									event.key === 'Enter'
								) {
									this.isOpen = !this.isOpen
								}
							}}
						>
							{this.trigger.label}
							<cm-icon
								icon="down"
								color={iconColor}
								ignoreTheme
							></cm-icon>
						</div>
					</div>
				)
			}
		} else {
			console.error('[cm-dropdown] .trigger is not defined!')
		}

		let flyoutOffset = 0

		if (this.trigger.type === 'icon') {
			flyoutOffset = 6
		}

		let flyoutElement = this.el.shadowRoot.querySelector('.flyout')
		let flyoutWidth = flyoutElement?.clientWidth
		let flyoutHeight = flyoutElement?.clientHeight
		let flyoutStyles: Record<string, string> = {}

		if (flyoutWidth && flyoutHeight) {
			const elementBoundingClientRect = this.el.getBoundingClientRect()
			const documentClientWidth = document.documentElement.clientWidth
			const documentClientHeight = document.documentElement.clientHeight

			let flyoutDownPositionTop =
				elementBoundingClientRect.bottom + 10 + flyoutOffset
			let flyoutUpPositionTop =
				elementBoundingClientRect.top - flyoutHeight - flyoutOffset - 10

			let right =
				documentClientWidth -
				elementBoundingClientRect.right -
				flyoutOffset

			if (documentClientWidth - right - flyoutWidth < 0) {
				flyoutStyles.left = `${elementBoundingClientRect.left}px`
			} else {
				flyoutStyles.right = `${right}px`
			}

			if (
				documentClientHeight - flyoutDownPositionTop - flyoutHeight <
					0 &&
				flyoutUpPositionTop > 0
			) {
				flyoutStyles.top = `${flyoutUpPositionTop}px`
			} else {
				flyoutStyles.top = `${flyoutDownPositionTop}px`
			}
		}

		flyout = (
			<div class={flyoutClasses} style={flyoutStyles}>
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
				<div
					class={{
						container: true,
						[this.theme]: true,
					}}
				>
					{trigger}
					{flyout}
				</div>
			</Host>
		)
	}
}
