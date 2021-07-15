import {
	Component,
	h,
	Element,
	Listen,
	Event,
	EventEmitter,
	Method,
	Watch,
	Prop,
	Host,
} from '@stencil/core'

import { isSlotEmpty } from '../../globalHelpers'

export type ComponentState = {
	label: string
	tab: HTMLCmPageTabElement
	handle: HTMLCmPageTabHandleElement
}

/**
 * @slot - The default slot only accepts `CmPageTabs`.
 * @slot header - Use this slot to display a headline for the page or page wide context menus.
 */
@Component({
	tag: 'cm-page',
	styleUrl: 'cm-page.scss',
	shadow: true,
})
export class CmPage {
	@Element() root: HTMLCmPageElement

	private tabRefs: HTMLCmPageTabElement[] = []
	private labelToTabMap: {
		[key: string]: HTMLCmPageTabElement
	} = {}
	private labelToHandleMap: {
		[key: string]: HTMLCmPageTabHandleElement
	} = {}
	private labels: string[] = []

	@Prop({ reflect: true, mutable: true }) activeLabel: string
	@Watch('activeLabel')
	activeTitleWatchHandler(newValue, oldValue) {
		this.parseTabList()

		if (!this.labels.includes(newValue)) {
			console.error(
				`Active label not found! Refusing to update. Requested activeLabel: '${newValue}' Old activeLabel: '${oldValue}' All labels: '${this.labels}'`,
			)

			if (!this.labels.includes(oldValue)) {
				console.error(
					`Old label is not there anymore. Refusing to revert. Requested activeLabel: '${newValue}' Old activeLabel: '${oldValue}' All labels: '${this.labels}'`,
				)
			} else {
				this.activeLabel = oldValue
			}
		} else {
			this.tabChanged.emit({
				label: newValue,
				tab: this.labelToTabMap[newValue],
				handle: this.labelToHandleMap[newValue],
			})
		}
	}

	/**
	 * This is emitted when the active tab is changed.
	 */
	@Event() tabChanged: EventEmitter<ComponentState>

	@Listen('tabModified')
	tabModifiedEventHandler() {
		this.parseTabList()
	}

	@Listen('userSelectedTab')
	userSelectedTabHandler(
		event: CustomEvent<{
			originalEvent: MouseEvent
			handle: HTMLCmPageTabHandleElement
			label: string
		}>,
	) {
		const label = event.detail.label
		this.switchToTab(label)
	}

	/**
	 * Returns the currently active tab, handle, and title.
	 */
	@Method()
	async getActiveState(): Promise<ComponentState> {
		return {
			label: this.activeLabel,
			tab: this.labelToTabMap[this.activeLabel],
			handle: this.labelToHandleMap[this.activeLabel],
		}
	}

	/**
	 * Switches to a tab based on their label.
	 * @param label Title of the target tab.
	 */
	@Method()
	async switchToTab(label: string) {
		this.activeLabel = label
	}

	/**
	 * Switches to a tab based on their index.
	 * @param index Index of the target tab.
	 */
	@Method()
	async switchToTabIndex(index: number) {
		const label = this.labels[index]
		return this.switchToTab(label)
	}

	onChildrenChange() {
		this.parseTabList()
	}

	parseTabList() {
		this.tabRefs = Array.from(this.root.querySelectorAll('cm-page-tab'))
		this.labels = this.tabRefs.map((tabRef) => tabRef.label)

		this.labelToTabMap = {}
		this.tabRefs.forEach((tabRef) => {
			this.labelToTabMap[tabRef.label] = tabRef
		})
	}

	async componentWillLoad() {
		// Ensure that slots are ready to be checked
		return new Promise((resolve) => requestAnimationFrame(resolve))
	}

	componentDidLoad() {
		const observer = new MutationObserver(this.onChildrenChange.bind(this))
		const options = {
			childList: true,
		}
		observer.observe(this.root, options)
	}

	async componentWillRender() {
		this.parseTabList()

		if (!this.labels.includes(this.activeLabel) && this.labels.length > 0) {
			await this.switchToTabIndex(0)
		}

		this.tabRefs.forEach((tabRef) => {
			tabRef.active = false
		})

		if (this.labelToTabMap.hasOwnProperty(this.activeLabel)) {
			this.labelToTabMap[this.activeLabel].active = true
		}

		this.labelToHandleMap = {}
	}

	render() {
		let handlesClasses = { handles: true, empty: this.tabRefs.length < 2 }

		let headerClasses = {
			empty: isSlotEmpty(this.root, 'header') && handlesClasses.empty,
		}

		return (
			<Host>
				<header class={headerClasses}>
					<div class="headerSlot">
						<slot name="header" />
					</div>
					<div class={handlesClasses}>
						{this.tabRefs.map((tab) => {
							return (
								<cm-page-tab-handle
									key={tab.label}
									label={tab.label}
									active={this.activeLabel === tab.label}
									ref={(elem) =>
										(this.labelToHandleMap[tab.label] =
											elem)
									}
								/>
							)
						})}
					</div>
				</header>
				<div class="tabs">
					<slot />
				</div>
			</Host>
		)
	}
}
