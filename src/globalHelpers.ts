export type Theme = 'Light' | 'Dark'

export const onThemeChange = async (
	callback: (theme: Theme) => void,
	options: { runOnInit?: boolean } = {},
) => {
	let context = document.querySelector('cm-context')

	if (context) {
		context.addEventListener(
			'themeChanged',
			(event: CustomEvent<{ theme: 'Dark' | 'Light' }>) => {
				callback(event.detail.theme)
			},
		)

		if (options.runOnInit ?? true) {
			callback(await context.getResolvedTheme())
		}
	}
}
