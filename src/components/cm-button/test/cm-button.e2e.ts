import { newE2EPage } from '@stencil/core/testing'

describe('cm-button', () => {
	it('renders', async () => {
		const page = await newE2EPage()
		await page.setContent('<cm-button></cm-button>')

		const element = await page.find('cm-button')
		expect(element).toHaveClass('hydrated')
	})

	it('calls cmPress event on button click', async () => {
		const page = await newE2EPage()

		await page.setContent('<cm-button></cm-button>')
		const spyCmPress = await page.spyOnEvent('cmPress')

		const button = await page.find('cm-button >>> [role="button"]')

		button.click()
		await page.waitForChanges()

		expect(spyCmPress).toHaveReceivedEventTimes(1)
	})

	it('calls cmPress event on keyboard event "Enter"', async () => {
		const page = await newE2EPage()

		await page.setContent('<cm-button></cm-button>')
		const spyCmPress = await page.spyOnEvent('cmPress')

		await page.keyboard.down('Tab')
		await page.keyboard.down('Enter')
		await page.waitForChanges()

		expect(spyCmPress).toHaveReceivedEventTimes(1)
	})

	it('calls cmPress event on keyboard event "Space"', async () => {
		const page = await newE2EPage()

		await page.setContent('<cm-button></cm-button>')
		const spyCmPress = await page.spyOnEvent('cmPress')

		await page.keyboard.down('Tab')
		await page.keyboard.down(' ')
		await page.waitForChanges()

		expect(spyCmPress).toHaveReceivedEventTimes(1)
	})

	it('does not call cmPress event on disabled button click', async () => {
		const page = await newE2EPage()

		await page.setContent('<cm-button disabled></cm-button>')
		const spyCmPress = await page.spyOnEvent('cmPress')

		const button = await page.find('cm-button >>> [role="button"]')

		button.click()
		await page.waitForChanges()

		expect(spyCmPress).not.toHaveReceivedEvent()
	})

	it('does not call cmPress event on loading button click', async () => {
		const page = await newE2EPage()

		await page.setContent('<cm-button loading></cm-button>')
		const spyCmPress = await page.spyOnEvent('cmPress')

		const button = await page.find('cm-button >>> [role="button"]')

		button.click()
		await page.waitForChanges()

		expect(spyCmPress).not.toHaveReceivedEvent()
	})

	it('calls cmPress event on loading link button click', async () => {
		const page = await newE2EPage()

		await page.setContent(
			'<cm-button loading appearance="link" label="Test"></cm-button>',
		)
		const spyCmPress = await page.spyOnEvent('cmPress')

		const button = await page.find('cm-button >>> [role="button"]')

		button.click()
		await page.waitForChanges()

		expect(spyCmPress).toHaveReceivedEventTimes(1)
	})
})
