import { newE2EPage } from '@stencil/core/testing'

describe('cm-text', () => {
	it('renders', async () => {
		const page = await newE2EPage()
		await page.setContent('<cm-text>This is a test</cm-text>')

		const element = await page.find('cm-text')
		expect(element).toEqualText('This is a test')
		expect(element).toHaveClass('hydrated')
	})
})
