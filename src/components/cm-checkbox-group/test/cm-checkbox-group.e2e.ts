import { newE2EPage } from '@stencil/core/testing'

describe('cm-checkbox-group', () => {
	it('renders', async () => {
		const page = await newE2EPage()
		await page.setContent('<cm-checkbox-group></cm-checkbox-group>')

		const element = await page.find('cm-checkbox-group')
		expect(element).toHaveClass('hydrated')
	})
})
