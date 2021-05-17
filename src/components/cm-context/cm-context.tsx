import {
	Component,
	Host,
	h,
	Prop,
	Event,
	EventEmitter,
	Method,
	Watch,
} from '@stencil/core'

import { Theme } from '../../globalHelpers'

@Component({
	tag: 'cm-context',
	shadow: true,
})
export class CmContext {
	@Prop({ mutable: true }) theme: Theme | 'Automatic' = 'Light'

	/**
	 * Emitted when the resolved theme changes.
	 */
	@Event() themeChanged: EventEmitter<{ theme: Theme }>

	@Watch('theme')
	themeChangeHandler() {
		this.themeChanged.emit({ theme: this._getResolvedTheme() })
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
