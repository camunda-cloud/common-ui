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

@Component({
	tag: 'cm-context',
	shadow: true,
})
export class CmContext {
	@Prop() theme: 'Light' | 'Dark' | 'Automatic' = 'Light'

	@Event() themeChanged: EventEmitter<{ theme: 'Dark' | 'Light' }>

	@Watch('theme')
	themeChangeHandler() {
		this.themeChanged.emit({ theme: this._getResolvedTheme() })
	}

	@Method() async getResolvedTheme() {
		return this._getResolvedTheme()
	}

	private _getResolvedTheme() {
		let resolvedTheme: 'Light' | 'Dark'

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
			<Host>
				<slot></slot>
			</Host>
		)
	}
}
