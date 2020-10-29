import { newE2EPage } from '@stencil/core/testing'

describe('cm-notification-container', () => {
	it('renders', async () => {
		const page = await newE2EPage()
		await page.setContent(
			'<cm-notification-container></cm-notification-container>',
		)

		const element = await page.find('cm-notification-container')
		expect(element).toHaveClass('hydrated')
	})
})
