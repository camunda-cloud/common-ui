import { newE2EPage } from '@stencil/core/testing'

describe('cm-dropdown', () => {
	it('renders', async () => {
		const page = await newE2EPage()
		await page.setContent('<cm-dropdown></cm-dropdown>')

		const element = await page.find('cm-dropdown')
		expect(element).toHaveClass('hydrated')
	})
})
