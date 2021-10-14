import { newE2EPage } from '@stencil/core/testing'

describe('cm-select-flyout', () => {
	it('renders', async () => {
		const page = await newE2EPage()
		await page.setContent('<cm-select-flyout></cm-select-flyout>')

		const element = await page.find('cm-select-flyout')
		expect(element).toHaveClass('hydrated')
	})
})
