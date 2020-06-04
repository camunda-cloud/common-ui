import { newE2EPage } from '@stencil/core/testing'

describe('cm-page', () => {
	it('renders', async () => {
		const page = await newE2EPage()
		await page.setContent('<cm-page></cm-page>')

		const element = await page.find('cm-page')
		expect(element).toHaveClass('hydrated')
	})
})
