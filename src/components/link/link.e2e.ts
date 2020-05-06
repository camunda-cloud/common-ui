import { newE2EPage } from '@stencil/core/testing'

describe('cm-link', () => {
	it('renders', async () => {
		const page = await newE2EPage()
		await page.setContent('<cm-link></cm-link>')

		const element = await page.find('cm-link')
		expect(element).toHaveClass('hydrated')
	})
})
