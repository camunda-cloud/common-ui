import { newE2EPage } from '@stencil/core/testing'

describe('cm-footer', () => {
	it('renders', async () => {
		const page = await newE2EPage()
		await page.setContent('<cm-footer></cm-footer>')

		const element = await page.find('cm-footer')
		expect(element).toHaveClass('hydrated')
	})
})
