import { newE2EPage } from '@stencil/core/testing'

describe('cm-icon', () => {
	it('renders', async () => {
		const page = await newE2EPage()
		await page.setContent('<cm-icon></cm-icon>')

		const element = await page.find('cm-icon')
		expect(element).toHaveClass('hydrated')
	})
})
