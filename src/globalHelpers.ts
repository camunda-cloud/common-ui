export type Theme = 'Light' | 'Dark'

export const onThemeChange = async (
	callback: (theme: Theme) => void,
	options: { runOnInit?: boolean } = {},
) => {
	if ((window as any).commonUIContext) {
		let context = (window as any).commonUIContext

		if (options.runOnInit ?? true) {
			callback(context._getResolvedTheme())
		}

		context.addEventListener(
			'themeChanged',
			(event: CustomEvent<{ theme: 'Dark' | 'Light' }>) => {
				callback(event.detail.theme)
			},
		)
	}
}
