import { newE2EPage } from '@stencil/core/testing'

describe('cm-modal', () => {
	it('renders', async () => {
		const page = await newE2EPage()
		await page.setContent('<cm-modal></cm-modal>')

		const element = await page.find('cm-modal')
		expect(element).toHaveClass('hydrated')
	})
})
