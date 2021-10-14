import { CmContext } from './components/cm-context/cm-context'

export type Theme = 'Light' | 'Dark'

export type ColorMap = Record<string, { Light: string; Dark: string }>

export type ValidatorResult =
	| { isValid: true }
	| { isValid: false; type: 'incomplete' | 'invalid'; message: string }

export const onThemeChange = async (
	callback: (theme: Theme) => void,
	options: { runOnInit?: boolean } = {},
) => {
	const context = getContext()

	if (context) {
		if (options.runOnInit ?? true) {
			callback(context._getResolvedTheme())
		}

		context.element.addEventListener(
			'themeChanged',
			(event: CustomEvent<{ theme: 'Dark' | 'Light' }>) => {
				callback(event.detail.theme)
			},
		)
	} else {
		document
			.querySelector('cm-context')
			?.addEventListener(
				'themeChanged',
				(event: CustomEvent<{ theme: 'Dark' | 'Light' }>) => {
					callback(event.detail.theme)
				},
			)
	}
}

export const getVariableValueFromDocument = (name: string) => {
	return getComputedStyle(document.documentElement)
		.getPropertyValue(name)
		.trim()
}

export const getContext = () => {
	if (typeof window !== 'undefined') {
		return (window as any).commonUIContext as CmContext | undefined
	}
}

export const getVariableValue = async (name: string) => {
	let context = getContext()

	if (context) {
		return context.getVariableValue(name)
	} else {
		return getVariableValueFromDocument(name)
	}
}

export const debounce = (callback, wait) => {
	let timeout

	return function () {
		let args = arguments

		let later = function () {
			timeout = null
			callback(args)
		}

		clearTimeout(timeout)
		timeout = setTimeout(later, wait)
	}
}
