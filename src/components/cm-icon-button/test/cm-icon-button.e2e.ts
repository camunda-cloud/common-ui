import { newE2EPage } from '@stencil/core/testing'

describe('cm-icon-button', () => {
	it('renders', async () => {
		const page = await newE2EPage()
		await page.setContent('<cm-icon-button></cm-icon-button>')

		const element = await page.find('cm-icon-button')
		expect(element).toHaveClass('hydrated')
	})
})
