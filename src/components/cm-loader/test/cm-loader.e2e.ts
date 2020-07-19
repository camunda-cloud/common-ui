import { newE2EPage } from '@stencil/core/testing'

describe('cm-loader', () => {
	it('renders', async () => {
		const page = await newE2EPage()
		await page.setContent('<cm-loader></cm-loader>')

		const element = await page.find('cm-loader')
		expect(element).toHaveClass('hydrated')
	})
})
