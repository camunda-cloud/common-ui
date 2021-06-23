import { newE2EPage } from '@stencil/core/testing'

describe('cm-radiobutton-group', () => {
	it('renders', async () => {
		const page = await newE2EPage()
		await page.setContent('<cm-radiobutton-group></cm-radiobutton-group>')

		const element = await page.find('cm-radiobutton-group')
		expect(element).toHaveClass('hydrated')
	})
})
