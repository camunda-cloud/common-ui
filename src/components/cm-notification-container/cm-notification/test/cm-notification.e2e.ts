import { newE2EPage } from '@stencil/core/testing'

describe('cm-notification', () => {
	it('renders', async () => {
		const page = await newE2EPage()
		await page.setContent('<cm-notification></cm-notification>')

		const element = await page.find('cm-notification')
		expect(element).toHaveClass('hydrated')
	})
})
