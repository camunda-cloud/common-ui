import {
	Component,
	h,
	Element,
	Event,
	Prop,
	Watch,
	EventEmitter,
	Host,
} from '@stencil/core'

@Component({
	tag: 'cm-page-tab',
	styleUrl: 'cm-page-tab.scss',
	shadow: true,
})
export class CmPageTab {
	@Element() root: HTMLCmPageTabElement

	/**
	 * Emitted when the Tab is modified, e.g. when the label is changed.
	 */
	@Event() tabModified: EventEmitter

	@Prop({ mutable: true, reflect: true }) label: string
	@Watch('label')
	labelWatchHandler() {
		this.tabModified.emit()
	}

	private readonly defaultActive = false
	@Prop({ mutable: true, reflect: true }) active: boolean = this.defaultActive
	@Watch('active')
	activeWatchHandler(newValue: boolean) {
		if (newValue === null || newValue === undefined) {
			this.active = this.defaultActive
		}
	}

	@Prop({ mutable: true, reflect: true }) disableScroll: boolean = false

	componentWillRender() {
		this.activeWatchHandler(this.active)
	}

	render() {
		return (
			<Host
				role="tabpanel"
				id={this.label}
				aria-expanded={this.active}
				aria-hidden={!this.active}
			>
				<slot />
			</Host>
		)
	}
}
