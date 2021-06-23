import { newE2EPage } from '@stencil/core/testing'

describe('cm-radiobutton', () => {
	it('renders', async () => {
		const page = await newE2EPage()
		await page.setContent('<cm-radiobutton></cm-radiobutton>')

		const element = await page.find('cm-radiobutton')
		expect(element).toHaveClass('hydrated')
	})
})
