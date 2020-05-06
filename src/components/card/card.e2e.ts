import { newE2EPage } from '@stencil/core/testing'

describe('cm-card', () => {
	it('renders', async () => {
		const page = await newE2EPage()
		await page.setContent('<cm-card></cm-card>')

		const element = await page.find('cm-card')
		expect(element).toHaveClass('hydrated')
	})
})
