import { newE2EPage } from '@stencil/core/testing'

describe('cm-form-group', () => {
	it('renders', async () => {
		const page = await newE2EPage()
		await page.setContent('<cm-form-group></cm-form-group>')

		const element = await page.find('cm-form-group')
		expect(element).toHaveClass('hydrated')
	})
})
