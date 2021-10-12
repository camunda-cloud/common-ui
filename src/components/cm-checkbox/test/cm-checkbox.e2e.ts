import { newE2EPage } from '@stencil/core/testing'

describe('cm-checkbox', () => {
	it('renders', async () => {
		const page = await newE2EPage()
		await page.setContent('<cm-checkbox></cm-checkbox>')

		const element = await page.find('cm-checkbox')
		expect(element).toHaveClass('hydrated')
	})

	describe('check validity', () => {
		it('is valid if not required', async () => {
			const page = await newE2EPage()
			await page.setContent(
				'<cm-checkbox form-name="testCheckbox" label="Test Checkbox"></cm-checkbox>',
			)

			const element = await page.find('cm-checkbox')

			await element.callMethod('checkValidity')
			await page.waitForChanges()

			expect(element).toEqualHtml(`
				<cm-checkbox class="hydrated" form-name="testCheckbox" helper-text="" label="Test Checkbox">
					<mock:shadow-root>
						<div class="container" tabindex="0">
							<div class="checkbox" role="checkbox"></div>
							<label>Test Checkbox</label>
							<cm-text class="hydrated"></cm-text>
							<div class="errorMessage"></div>
						</div>
					</mock:shadow-root>
				</cm-checkbox>
			`)
		})

		it('is valid if required and checked', async () => {
			const page = await newE2EPage()
			await page.setContent(
				'<cm-checkbox form-name="testCheckbox" label="Test Checkbox" required checked></cm-checkbox>',
			)

			const element = await page.find('cm-checkbox')

			await element.callMethod('checkValidity')
			await page.waitForChanges()

			expect(element).toEqualHtml(`
				<cm-checkbox checked="" class="hydrated" form-name="testCheckbox" helper-text="" label="Test Checkbox" required="">
					<mock:shadow-root>
						<div class="container" tabindex="0">
							<div class="checkbox checked" role="checkbox"></div>
							<label>Test Checkbox</label>
							<cm-text class="hydrated"></cm-text>
							<div class="errorMessage"></div>
						</div>
					</mock:shadow-root>
				</cm-checkbox>
			`)
		})

		it('displays error if required and not checked', async () => {
			const page = await newE2EPage()
			await page.setContent(
				'<cm-checkbox form-name="requiredCheckbox" label="Required Checkbox" required></cm-checkbox>',
			)

			const element = await page.find('cm-checkbox')

			await element.callMethod('checkValidity')
			await page.waitForChanges()

			expect(element).toEqualHtml(`
				<cm-checkbox class="hydrated" form-name="requiredCheckbox" helper-text="" label="Required Checkbox" required="">
					<mock:shadow-root>
						<div class="container hasError" tabindex="0">
							<div class="checkbox" role="checkbox"></div>
							<label>Required Checkbox</label>
							<cm-text class="hydrated"></cm-text>
							<div class="errorMessage">
								<cm-icon class="hydrated"></cm-icon>
								Please check this box if you want to proceed.
							</div>
						</div>
					</mock:shadow-root>
				</cm-checkbox>
			`)
		})
	})

	describe('click event', () => {
		it('toggles checked state', async () => {
			const page = await newE2EPage()
			await page.setContent(
				'<cm-checkbox form-name="requiredCheckbox" label="Required Checkbox" required></cm-checkbox>',
			)

			const element = await page.find('cm-checkbox')
			await element.click()
			await page.waitForChanges()

			expect(element).toEqualHtml(`
				<cm-checkbox checked="" class="hydrated" form-name="requiredCheckbox" helper-text="" label="Required Checkbox" required="">
					<mock:shadow-root>
						<div class="container" tabindex="0">
							<div class="checkbox checked" role="checkbox"></div>
							<label>Required Checkbox</label>
							<cm-text class="hydrated"></cm-text>
							<div class="errorMessage"></div>
						</div>
					</mock:shadow-root>
				</cm-checkbox>
			`)

			await element.click()
			await page.waitForChanges()

			expect(element).toEqualHtml(`
				<cm-checkbox class="hydrated" form-name="requiredCheckbox" helper-text="" label="Required Checkbox" required="">
					<mock:shadow-root>
						<div class="container" tabindex="0">
							<div class="checkbox" role="checkbox"></div>
							<label>Required Checkbox</label>
							<cm-text class="hydrated"></cm-text>
							<div class="errorMessage"></div>
						</div>
					</mock:shadow-root>
				</cm-checkbox>
			`)
		})

		it('does not toggle checked state if disabled', async () => {
			const page = await newE2EPage()
			await page.setContent(
				'<cm-checkbox disabled form-name="testCheckbox" label="Test Label"></cm-checkbox>',
			)

			const element = await page.find('cm-checkbox')
			await element.click()
			await page.waitForChanges()

			expect(element).toEqualHtml(`
				<cm-checkbox class="hydrated" disabled="" form-name="testCheckbox" helper-text="" label="Test Label">
					<mock:shadow-root>
						<div class="container disabled" tabindex="-1">
							<div aria-disabled="" class="checkbox disabled" role="checkbox"></div>
							<label>Test Label</label>
							<cm-text class="hydrated"></cm-text>
							<div class="errorMessage"></div>
						</div>
					</mock:shadow-root>
				</cm-checkbox>
			`)
		})
	})

	describe('keyboard "Space" event', () => {
		it('toggles checked state', async () => {
			const page = await newE2EPage()
			await page.setContent(
				'<cm-checkbox form-name="testCheckbox" label="Test Label"></cm-checkbox>',
			)

			const element = await page.find('cm-checkbox')

			await page.keyboard.down('Tab')
			await page.keyboard.down(' ')
			await page.waitForChanges()

			expect(element).toEqualHtml(`
				<cm-checkbox checked="" class="hydrated" form-name="testCheckbox" helper-text="" label="Test Label">
					<mock:shadow-root>
						<div class="container" tabindex="0">
							<div class="checkbox checked" role="checkbox"></div>
							<label>Test Label</label>
							<cm-text class="hydrated"></cm-text>
							<div class="errorMessage"></div>
						</div>
					</mock:shadow-root>
				</cm-checkbox>
			`)

			await page.keyboard.down(' ')
			await page.waitForChanges()

			expect(element).toEqualHtml(`
				<cm-checkbox class="hydrated" form-name="testCheckbox" helper-text="" label="Test Label">
					<mock:shadow-root>
						<div class="container" tabindex="0">
							<div class="checkbox" role="checkbox"></div>
							<label>Test Label</label>
							<cm-text class="hydrated"></cm-text>
							<div class="errorMessage"></div>
						</div>
					</mock:shadow-root>
				</cm-checkbox>
			`)
		})

		it('does not toggle checked state if disabled', async () => {
			const page = await newE2EPage()
			await page.setContent(
				'<cm-checkbox form-name="testCheckbox" label="Test Label" disabled></cm-checkbox>',
			)

			const element = await page.find('cm-checkbox')

			await page.keyboard.down('Tab')
			await page.keyboard.down(' ')
			await page.waitForChanges()
			expect(element).toEqualHtml(`
				<cm-checkbox class="hydrated" disabled="" form-name="testCheckbox" helper-text="" label="Test Label">
					<mock:shadow-root>
						<div class="container disabled" tabindex="-1">
							<div aria-disabled="" class="checkbox disabled" role="checkbox"></div>
							<label>Test Label</label>
							<cm-text class="hydrated"></cm-text>
							<div class="errorMessage"></div>
						</div>
					</mock:shadow-root>
				</cm-checkbox>
			`)
		})
	})

	it('changes checked state when disabled and force flags are set to true', async () => {
		const page = await newE2EPage()
		await page.setContent(
			'<cm-checkbox disabled form-name="testCheckbox" label="Test Label"></cm-checkbox>',
		)

		const element = await page.find('cm-checkbox')

		await element.callMethod('check', { forceCheck: true })
		await page.waitForChanges()

		expect(element).toEqualHtml(`
			<cm-checkbox class="hydrated" checked="" disabled="" form-name="testCheckbox" helper-text="" label="Test Label">
				<mock:shadow-root>
					<div class="container disabled" tabindex="-1">
						<div aria-disabled="" class="checkbox disabled checked" role="checkbox"></div>
						<label>Test Label</label>
						<cm-text class="hydrated"></cm-text>
						<div class="errorMessage"></div>
					</div>
				</mock:shadow-root>
			</cm-checkbox>
		`)

		await element.callMethod('uncheck', { forceUncheck: true })
		await page.waitForChanges()

		expect(element).toEqualHtml(`
			<cm-checkbox class="hydrated" disabled="" form-name="testCheckbox" helper-text="" label="Test Label">
				<mock:shadow-root>
					<div class="container disabled" tabindex="-1">
						<div aria-disabled="" class="checkbox disabled" role="checkbox"></div>
						<label>Test Label</label>
						<cm-text class="hydrated"></cm-text>
						<div class="errorMessage"></div>
					</div>
				</mock:shadow-root>
			</cm-checkbox>
		`)

		await element.callMethod('toggleCheck', { forceToggle: true })
		await page.waitForChanges()

		expect(element).toEqualHtml(`
			<cm-checkbox class="hydrated" checked="" disabled="" form-name="testCheckbox" helper-text="" label="Test Label">
				<mock:shadow-root>
					<div class="container disabled" tabindex="-1">
						<div aria-disabled="" class="checkbox disabled checked" role="checkbox"></div>
						<label>Test Label</label>
						<cm-text class="hydrated"></cm-text>
						<div class="errorMessage"></div>
					</div>
				</mock:shadow-root>
			</cm-checkbox>
		`)

		await element.callMethod('toggleCheck', { forceToggle: true })
		await page.waitForChanges()

		expect(element).toEqualHtml(`
			<cm-checkbox class="hydrated" disabled="" form-name="testCheckbox" helper-text="" label="Test Label">
				<mock:shadow-root>
					<div class="container disabled" tabindex="-1">
						<div aria-disabled="" class="checkbox disabled" role="checkbox"></div>
						<label>Test Label</label>
						<cm-text class="hydrated"></cm-text>
						<div class="errorMessage"></div>
					</div>
				</mock:shadow-root>
			</cm-checkbox>
		`)
	})

	it('resets checked state', async () => {
		const page = await newE2EPage()
		await page.setContent(
			'<cm-checkbox checked form-name="testCheckbox" label="Test Label"></cm-checkbox>',
		)

		const element = await page.find('cm-checkbox')

		await element.callMethod('reset')
		await page.waitForChanges()

		expect(element).toEqualHtml(`
			<cm-checkbox class="hydrated" form-name="testCheckbox" helper-text="" label="Test Label">
				<mock:shadow-root>
					<div class="container" tabindex="0">
						<div class="checkbox" role="checkbox"></div>
						<label>Test Label</label>
						<cm-text class="hydrated"></cm-text>
						<div class="errorMessage"></div>
					</div>
				</mock:shadow-root>
			</cm-checkbox>
		`)
	})

	it('renders/hides validity', async () => {
		const page = await newE2EPage()
		await page.setContent(
			'<cm-checkbox required form-name="testCheckbox" label="Test Label"></cm-checkbox>',
		)

		const element = await page.find('cm-checkbox')

		await element.callMethod('renderValidity')
		await page.waitForChanges()

		expect(element).toEqualHtml(`
			<cm-checkbox class="hydrated" form-name="testCheckbox" helper-text="" label="Test Label" required="">
				<mock:shadow-root>
					<div class="container hasError" tabindex="0">
						<div class="checkbox" role="checkbox"></div>
						<label>Test Label</label>
						<cm-text class="hydrated"></cm-text>
						<div class="errorMessage">
							<cm-icon class="hydrated"></cm-icon>
							Please check this box if you want to proceed.
						</div>
					</div>
				</mock:shadow-root>
			</cm-checkbox>
		`)

		await element.callMethod('hideValidity')
		await page.waitForChanges()

		expect(element).toEqualHtml(`
			<cm-checkbox class="hydrated" form-name="testCheckbox" helper-text="" label="Test Label" required="">
				<mock:shadow-root>
					<div class="container" tabindex="0">
						<div class="checkbox" role="checkbox"></div>
						<label>Test Label</label>
						<cm-text class="hydrated"></cm-text>
						<div class="errorMessage"></div>
					</div>
				</mock:shadow-root>
			</cm-checkbox>
		`)
	})
})
