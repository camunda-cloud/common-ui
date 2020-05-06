import { newE2EPage } from '@stencil/core/testing'

describe('cm-button', () => {
	it('renders', async () => {
		const page = await newE2EPage()
		await page.setContent('<cm-button></cm-button>')

		const element = await page.find('cm-button')
		expect(element).toHaveClass('hydrated')
	})
})
