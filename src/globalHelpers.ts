export type Theme = 'Light' | 'Dark'

export type ColorMap = Record<string, { Light: string; Dark: string }>

export const onThemeChange = async (
	callback: (theme: Theme) => void,
	options: { runOnInit?: boolean } = {},
) => {
	if ((window as any).commonUIContext) {
		if (options.runOnInit ?? true) {
			callback((window as any).commonUIContext._getResolvedTheme())
		}
	}

	let context = document.querySelector('cm-context')

	if (context) {
		context.addEventListener(
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

export const getVariableValue = (name: string) => {
	let context = (window as any).commonUIContext

	if (!context) {
		context = document.querySelector('cm-context')
	}

	if (context) {
		return context.getVariableValue(name)
	} else {
		return getVariableValueFromDocument(name)
	}
}
