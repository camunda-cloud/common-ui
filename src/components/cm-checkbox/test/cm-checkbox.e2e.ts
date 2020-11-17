import { newE2EPage } from '@stencil/core/testing'

describe('cm-checkbox', () => {
	it('renders', async () => {
		const page = await newE2EPage()
		await page.setContent('<cm-checkbox></cm-checkbox>')

		const element = await page.find('cm-checkbox')
		expect(element).toHaveClass('hydrated')
	})
})
