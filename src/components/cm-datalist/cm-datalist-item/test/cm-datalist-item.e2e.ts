import { newE2EPage } from '@stencil/core/testing'

describe('cm-datalist-item', () => {
	it('renders', async () => {
		const page = await newE2EPage()
		await page.setContent('<cm-datalist-item></cm-datalist-item>')

		const element = await page.find('cm-datalist-item')
		expect(element).toHaveClass('hydrated')
	})
})
