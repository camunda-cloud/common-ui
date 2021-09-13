import { newE2EPage } from '@stencil/core/testing'

describe('cm-logo', () => {
	it('renders', async () => {
		const page = await newE2EPage()
		await page.setContent('<cm-logo></cm-logo>')

		const element = await page.find('cm-logo')
		expect(element).toHaveClass('hydrated')
	})
})
