import {
	Component,
	Prop,
	Event,
	EventEmitter,
	Element,
	Watch,
	Listen,
	Host,
	h,
	State,
} from '@stencil/core'

@Component({
	tag: 'cm-page-tab-handle',
	styleUrl: 'cm-page-tab-handle.scss',
	shadow: true,
})
export class CmPageTabHandle {
	@Element() root: HTMLCmPageTabHandleElement
	span: HTMLSpanElement

	@State() latestFocusWasClick: boolean = false

	@Prop() label: string

	private readonly defaultActive = false
	@Prop({ reflect: true }) active: boolean = this.defaultActive

	@Watch('active')
	activeWatchHandler(newValue: boolean) {
		if (newValue === null || newValue === undefined) {
			this.active = this.defaultActive
		}
	}

	@Event() userSelectedTab: EventEmitter<{
		originalEvent: MouseEvent | KeyboardEvent
		handle: HTMLCmPageTabHandleElement
		label: string
	}>

	@Listen('click')
	clickEventHandler(event: MouseEvent) {
		this.userSelectedTab.emit({
			originalEvent: event,
			handle: this.root,
			label: this.label,
		})
	}

	@Listen('keydown')
	handleKeyDown(event: KeyboardEvent) {
		if (
			!(event.key === 'Control') &&
			!(event.key === 'Meta') &&
			!(event.key === 'Alt') &&
			!(event.key === 'Shift' && event.code !== 'Tab')
		) {
			this.latestFocusWasClick = false
		}

		if (event.key === ' ' || event.key === 'Enter') {
			this.userSelectedTab.emit({
				originalEvent: event,
				handle: this.root,
				label: this.label,
			})
		}
	}

	// Prevent clicks from giving visual focus
	@Listen('mousedown', { passive: false })
	handleMouseDown(event: MouseEvent) {
		this.latestFocusWasClick = true
		event.preventDefault()
	}

	@Listen('blur', { passive: false })
	handleBlur() {
		this.latestFocusWasClick = false
	}

	componentWillUpdate() {
		if (this.latestFocusWasClick) {
			this.span.focus()
		}
	}

	componentWillRender() {
		this.activeWatchHandler(this.active)
	}

	render() {
		let classes = { active: this.active, clicked: this.latestFocusWasClick }
		return (
			<Host>
				<span
					class={classes}
					data-label={this.label}
					ref={(element) => (this.span = element)}
					tabindex="0"
					role="tab"
					aria-controls={this.label}
					aria-selected={this.active}
				>
					{this.label}
				</span>
			</Host>
		)
	}
}
