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
} from '@stencil/core'

@Component({
	tag: 'cm-page-tab-handle',
	styleUrl: 'cm-page-tab-handle.scss',
	shadow: true,
})
export class CmPageTabHandle {
	@Element() root: HTMLCmPageTabHandleElement

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
		originalEvent: MouseEvent
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

	componentWillRender() {
		this.activeWatchHandler(this.active)
	}

	render() {
		let classes = { active: this.active }
		return (
			<Host>
				<span class={classes} data-label={this.label}>
					{this.label}
				</span>
			</Host>
		)
	}
}
