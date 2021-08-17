import { newE2EPage } from '@stencil/core/testing'

describe('cm-form', () => {
	it('renders', async () => {
		const page = await newE2EPage()
		await page.setContent('<cm-form></cm-form>')

		const element = await page.find('cm-form')
		expect(element).toHaveClass('hydrated')
	})
})
