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
import { onThemeChange, Theme } from '../../../globalHelpers'

@Component({
	tag: 'cm-page-tab-handle',
	styleUrl: 'cm-page-tab-handle.scss',
	shadow: true,
})
export class CmPageTabHandle {
	@State() theme: Theme = 'Light'

	@Element() root: HTMLCmPageTabHandleElement
	span: HTMLSpanElement

	@Prop({ mutable: true }) label: string

	private readonly defaultActive = false
	@Prop({ mutable: true, reflect: true }) active: boolean = this.defaultActive

	@Watch('active')
	activeWatchHandler(newValue: boolean) {
		if (newValue === null || newValue === undefined) {
			this.active = this.defaultActive
		}
	}

	/**
	 * Emitted when the Tab is being selected by the user.
	 */
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
		if (event.key === ' ' || event.key === 'Enter') {
			this.userSelectedTab.emit({
				originalEvent: event,
				handle: this.root,
				label: this.label,
			})
		}
	}

	componentWillLoad() {
		onThemeChange((theme) => {
			this.theme = theme
		})
	}

	componentWillRender() {
		this.activeWatchHandler(this.active)
	}

	render() {
		let classes = { active: this.active, [this.theme]: true }

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
