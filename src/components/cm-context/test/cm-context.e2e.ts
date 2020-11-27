import { newE2EPage } from '@stencil/core/testing'

describe('cm-context', () => {
	it('renders', async () => {
		const page = await newE2EPage()
		await page.setContent('<cm-context></cm-context>')

		const element = await page.find('cm-context')
		expect(element).toHaveClass('hydrated')
	})
})
