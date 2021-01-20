import { newE2EPage } from '@stencil/core/testing'

describe('cm-entity-list', () => {
	it('renders', async () => {
		const page = await newE2EPage()
		await page.setContent('<cm-entity-list></cm-entity-list>')

		const element = await page.find('cm-entity-list')
		expect(element).toHaveClass('hydrated')
	})
})
