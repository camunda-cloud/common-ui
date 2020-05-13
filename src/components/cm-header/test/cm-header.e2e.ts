import { newE2EPage } from '@stencil/core/testing'

describe('cm-header', () => {
	it('renders', async () => {
		const page = await newE2EPage()
		await page.setContent('<cm-header></cm-header>')

		const element = await page.find('cm-header')
		expect(element).toHaveClass('hydrated')
	})
})
