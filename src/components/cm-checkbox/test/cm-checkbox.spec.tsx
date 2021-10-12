import { newSpecPage } from '@stencil/core/testing'
import { CmCheckbox } from '../cm-checkbox'

describe('cm-checkbox', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [CmCheckbox],
			html: `<cm-checkbox></cm-checkbox>`,
		})
		expect(page.root).toEqualHtml(`
			<cm-checkbox form-name="" helper-text="" label="">
				<mock:shadow-root>
					<div class="container" tabindex="0">
						<div class="checkbox" role="checkbox"></div>
						<label></label>
						<cm-text appearance="helperText" color="subtle"></cm-text>
						<div class="errorMessage"></div>
					</div>
				</mock:shadow-root>
			</cm-checkbox>
		`)
	})

	it('renders with label', async () => {
		const page = await newSpecPage({
			components: [CmCheckbox],
			html: `<cm-checkbox label="Checkbox" ></cm-checkbox>`,
		})
		expect(page.root).toEqualHtml(`
			<cm-checkbox form-name="" helper-text="" label="Checkbox">
				<mock:shadow-root>
					<div class="container" tabindex="0">
						<div class="checkbox" role="checkbox"></div>
						<label>Checkbox</label>
						<cm-text appearance="helperText" color="subtle"></cm-text>
						<div class="errorMessage"></div>
					</div>
				</mock:shadow-root>
			</cm-checkbox>
		`)
	})

	it('renders with helper text', async () => {
		const page = await newSpecPage({
			components: [CmCheckbox],
			html: `<cm-checkbox label="Checkbox" helper-text="Helper Text"></cm-checkbox>`,
		})
		expect(page.root).toEqualHtml(`
			<cm-checkbox form-name="" helper-text="Helper Text" label="Checkbox">
				<mock:shadow-root>
					<div class="container" tabindex="0">
						<div class="checkbox" role="checkbox"></div>
						<label>Checkbox</label>
						<cm-text appearance="helperText" color="subtle">
							Helper Text
						</cm-text>
						<div class="errorMessage"></div>
					</div>
				</mock:shadow-root>
			</cm-checkbox>
		`)
	})

	it('renders checked', async () => {
		const page = await newSpecPage({
			components: [CmCheckbox],
			html: `<cm-checkbox checked></cm-checkbox>`,
		})
		expect(page.root).toEqualHtml(`
			<cm-checkbox checked="" form-name="" helper-text="" label="">
				<mock:shadow-root>
					<div class="container" tabindex="0">
						<div class="checkbox checked" role="checkbox"></div>
						<label></label>
						<cm-text appearance="helperText" color="subtle"></cm-text>
						<div class="errorMessage"></div>
					</div>
				</mock:shadow-root>
			</cm-checkbox>
		`)
	})

	it('renders indeterminate', async () => {
		const page = await newSpecPage({
			components: [CmCheckbox],
			html: `<cm-checkbox label="Checkbox" indeterminate></cm-checkbox>`,
		})
		expect(page.root).toEqualHtml(`
			<cm-checkbox form-name="" helper-text="" indeterminate="" label="Checkbox">
				<mock:shadow-root>
					<div class="container" tabindex="0">
						<div class="checkbox indeterminate" role="checkbox"></div>
						<label>Checkbox</label>
						<cm-text appearance="helperText" color="subtle"></cm-text>
						<div class="errorMessage"></div>
					</div>
				</mock:shadow-root>
			</cm-checkbox>
		`)
	})

	it('renders disabled', async () => {
		const page = await newSpecPage({
			components: [CmCheckbox],
			html: `<cm-checkbox disabled></cm-checkbox>`,
		})
		expect(page.root).toEqualHtml(`
			<cm-checkbox disabled="" form-name="" helper-text="" label="">
				<mock:shadow-root>
					<div class="container disabled" tabindex="-1">
						<div aria-disabled="" class="checkbox disabled" role="checkbox"></div>
						<label></label>
						<cm-text appearance="helperText" color="subtle"></cm-text>
						<div class="errorMessage"></div>
					</div>
				</mock:shadow-root>
			</cm-checkbox>
		`)
	})

	it('renders required', async () => {
		const page = await newSpecPage({
			components: [CmCheckbox],
			html: `<cm-checkbox label="Checkbox" required></cm-checkbox>`,
		})
		expect(page.root).toEqualHtml(`
			<cm-checkbox form-name="" helper-text="" required="" label="Checkbox">
				<mock:shadow-root>
					<div class="container" tabindex="0">
						<div class="checkbox" role="checkbox"></div>
						<label>Checkbox</label>
						<cm-text appearance="helperText" color="subtle"></cm-text>
						<div class="errorMessage"></div>
					</div>
				</mock:shadow-root>
			</cm-checkbox>
		`)
	})

	it('renders with form name', async () => {
		const page = await newSpecPage({
			components: [CmCheckbox],
			html: `<cm-checkbox label="Checkbox" form-name="testCheckbox"></cm-checkbox>`,
		})
		expect(page.root).toEqualHtml(`
			<cm-checkbox form-name="testCheckbox" helper-text="" label="Checkbox">
				<mock:shadow-root>
					<div class="container" tabindex="0">
						<div class="checkbox" role="checkbox"></div>
						<label>Checkbox</label>
						<cm-text appearance="helperText" color="subtle"></cm-text>
						<div class="errorMessage"></div>
					</div>
				</mock:shadow-root>
			</cm-checkbox>
		`)
	})
})
