import { newE2EPage } from '@stencil/core/testing'

describe('cm-toggle', () => {
	it('renders', async () => {
		const page = await newE2EPage()
		await page.setContent('<cm-toggle></cm-toggle>')

		const element = await page.find('cm-toggle')
		expect(element).toHaveClass('hydrated')
	})
})
