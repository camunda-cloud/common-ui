import {
	Component,
	Host,
	h,
	Prop,
	Event,
	EventEmitter,
	Method,
	Watch,
	Element,
} from '@stencil/core'

import { getVariableValueFromDocument, Theme } from '../../globalHelpers'

@Component({
	tag: 'cm-context',
	shadow: true,
})
export class CmContext {
	@Element() element: HTMLCmContextElement

	variableCache: Map<string, string> = new Map()

	@Prop({ mutable: true }) theme: Theme | 'Automatic' = 'Light'

	/**
	 * Emitted when the resolved theme changes.
	 */
	@Event() themeChanged: EventEmitter<{ theme: Theme }>

	@Watch('theme')
	themeChangeHandler() {
		if (
			this.theme !== 'Light' &&
			this.theme !== 'Dark' &&
			this.theme !== 'Automatic'
		) {
			console.error(
				`Invalid theme property "${this.theme}" set on cm-context!`,
			)
		}

		this.themeChanged.emit({ theme: this._getResolvedTheme() })
	}

	/**
	 * Returns the Value of the requested variable, caching it in the process.
	 */
	@Method()
	async getVariableValue(name: string) {
		if (!this.variableCache.has(name)) {
			this.variableCache.set(name, getVariableValueFromDocument(name))
		}

		return this.variableCache.get(name)
	}

	/**
	 * Returns the actual theme, resolving "Automatic" to an actual value.
	 */
	@Method()
	async getResolvedTheme() {
		return this._getResolvedTheme()
	}

	_getResolvedTheme() {
		let resolvedTheme: Theme

		if (this.theme === 'Automatic') {
			if (window.matchMedia('(prefers-color-scheme: light)').matches) {
				resolvedTheme = 'Light'
			} else {
				resolvedTheme = 'Dark'
			}
		} else {
			resolvedTheme = this.theme
		}

		return resolvedTheme
	}

	componentWillLoad() {
		;(window as any).commonUIContext = this

		window
			.matchMedia('(prefers-color-scheme: light)')
			.addEventListener('change', (event) => {
				if (this.theme === 'Automatic') {
					if (event.matches) {
						this.themeChanged.emit({ theme: 'Light' })
					} else {
						this.themeChanged.emit({ theme: 'Dark' })
					}
				}
			})
	}

	render() {
		return (
			<Host style={{ display: 'none' }}>
				<slot></slot>
			</Host>
		)
	}
}
