import { newE2EPage } from '@stencil/core/testing'

describe('cm-card', () => {
	it('renders', async () => {
		const page = await newE2EPage()
		await page.setContent('<cm-card></cm-card>')

		const element = await page.find('cm-card')
		expect(element).toHaveClass('hydrated')
	})

	it('calls cmDismissed event on dismiss button click', async () => {
		const page = await newE2EPage()

		await page.setContent('<cm-card is-dismissable="true"></cm-card>')
		const spyCmDismissed = await page.spyOnEvent('cmDismissed')

		const closeButton = await page.find('cm-card >>> #dismissButton')

		closeButton.click()
		await page.waitForChanges()

		expect(spyCmDismissed).toHaveReceivedEvent()
	})
})
