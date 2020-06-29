import { newE2EPage } from '@stencil/core/testing'

describe('cm-datalist', () => {
	it('renders', async () => {
		const page = await newE2EPage()
		await page.setContent('<cm-datalist></cm-datalist>')

		const element = await page.find('cm-datalist')
		expect(element).toHaveClass('hydrated')
	})
})
