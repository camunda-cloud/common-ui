import { newE2EPage } from '@stencil/core/testing'

describe('cm-banner', () => {
	it('renders', async () => {
		const page = await newE2EPage()
		await page.setContent('<cm-banner></cm-banner>')

		const element = await page.find('cm-banner')
		expect(element).toHaveClass('hydrated')
	})
})
