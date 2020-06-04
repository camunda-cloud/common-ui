import { newE2EPage } from '@stencil/core/testing'

describe('cm-page-tab-handle', () => {
	it('renders', async () => {
		const page = await newE2EPage()
		await page.setContent('<cm-page-tab-handle></cm-page-tab-handle>')

		const element = await page.find('cm-page-tab-handle')
		expect(element).toHaveClass('hydrated')
	})
})
