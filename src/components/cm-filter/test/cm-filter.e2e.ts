import { newE2EPage } from '@stencil/core/testing'

describe('cm-filter', () => {
	it('renders', async () => {
		const page = await newE2EPage()
		await page.setContent('<cm-filter></cm-filter>')

		const element = await page.find('cm-filter')
		expect(element).toHaveClass('hydrated')
	})
})
