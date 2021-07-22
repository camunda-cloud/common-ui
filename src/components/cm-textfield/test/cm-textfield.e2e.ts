import { newE2EPage } from '@stencil/core/testing'

describe('cm-textfield', () => {
	it('renders', async () => {
		const page = await newE2EPage()
		await page.setContent('<cm-textfield></cm-textfield>')

		const element = await page.find('cm-textfield')
		expect(element).toHaveClass('hydrated')
	})
})
