export type Theme = 'Light' | 'Dark'

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
