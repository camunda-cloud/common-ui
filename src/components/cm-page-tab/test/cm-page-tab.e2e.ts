import { newE2EPage } from '@stencil/core/testing'

describe('cm-page-tab', () => {
	it('renders', async () => {
		const page = await newE2EPage()
		await page.setContent('<cm-page-tab></cm-page-tab>')

		const element = await page.find('cm-page-tab')
		expect(element).toHaveClass('hydrated')
	})
})
