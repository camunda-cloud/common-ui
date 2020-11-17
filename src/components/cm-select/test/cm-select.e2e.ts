import { newE2EPage } from '@stencil/core/testing'

describe('cm-select', () => {
	it('renders', async () => {
		const page = await newE2EPage()
		await page.setContent('<cm-select></cm-select>')

		const element = await page.find('cm-select')
		expect(element).toHaveClass('hydrated')
	})
})
