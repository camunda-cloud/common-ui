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

	if (options.runOnInit ?? true) {
		if (context) {
			callback(context._getResolvedTheme())
		} else {
			callback(
				(await document
					.querySelector('cm-context')
					?.getResolvedTheme()) ?? 'Light',
			)
		}
	}

	if (context) {
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

export const debounce = (callback: Function, wait: number) => {
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

// Original Source: https://github.com/bevacqua/fuzzysearch/blob/master/index.js
// This is a simple fuzzy search, without Levenshtein Distance,
// a tradeoff taken for the substantially smaller source size.
export const fuzzysearch = (
	searchTerm: string = '',
	searchTarget: string = '',
) => {
	let searchTargetLength = searchTarget.length
	let searchTermLength = searchTerm.length

	if (searchTermLength > searchTargetLength) {
		return false
	}

	if (searchTermLength === searchTargetLength) {
		return searchTerm === searchTarget
	}

	outer: for (let i = 0, j = 0; i < searchTermLength; i++) {
		let searchTermCharacter = searchTerm.charCodeAt(i)

		while (j < searchTargetLength) {
			if (searchTarget.charCodeAt(j++) === searchTermCharacter) {
				continue outer
			}
		}

		return false
	}

	return true
}
