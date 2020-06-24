import {
	Component,
	h,
	Element,
	Event,
	Prop,
	Watch,
	EventEmitter,
} from '@stencil/core'

@Component({
	tag: 'cm-page-tab',
	styleUrl: 'cm-page-tab.scss',
	shadow: true,
})
export class CmPageTab {
	@Element() root: HTMLCmPageTabElement

	@Event() tabModified: EventEmitter

	@Prop({ reflect: true }) label: string
	@Watch('label')
	labelWatchHandler() {
		this.tabModified.emit()
	}

	private readonly defaultActive = false
	@Prop({ reflect: true }) active: boolean = this.defaultActive
	@Watch('active')
	activeWatchHandler(newValue: boolean) {
		if (newValue === null || newValue === undefined) {
			this.active = this.defaultActive
		}
	}

	componentWillRender() {
		this.activeWatchHandler(this.active)
	}

	render() {
		return <slot />
	}
}
