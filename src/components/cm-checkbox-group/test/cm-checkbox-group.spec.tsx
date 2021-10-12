import { newSpecPage } from '@stencil/core/testing'
import { CmCheckboxGroup } from '../cm-checkbox-group'

describe('cm-checkbox-group', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [CmCheckboxGroup],
			html: `<cm-checkbox-group></cm-checkbox-group>`,
		})

		expect(page.root).toEqualHtml(`
			<cm-checkbox-group>
				<mock:shadow-root>
					<div class="container">
						<slot></slot>
					</div>
				</mock:shadow-root>
			</cm-checkbox-group>
		`)
	})

	it('renders a group of checkboxes with a label', async () => {
		const page = await newSpecPage({
			components: [CmCheckboxGroup],
			html: `<cm-checkbox-group label="Checkboxes">
			<cm-checkbox
				label="Checkbox"
				helper-text="Helper Text"
			></cm-checkbox>

			<cm-checkbox
				form-name="requiredCheckbox"
				label="Required Checkbox"
				required
			></cm-checkbox>
		</cm-checkbox-group>`,
		})

		expect(page.root).toEqualHtml(`
			<cm-checkbox-group label="Checkboxes">
				<mock:shadow-root>
					<cm-text appearance="emphasis" id="label">Checkboxes</cm-text>
					<div class="container">
						<slot></slot>
					</div>
				</mock:shadow-root>
				<cm-checkbox helper-text="Helper Text" label="Checkbox"></cm-checkbox>
				<cm-checkbox form-name="requiredCheckbox" label="Required Checkbox" required=""></cm-checkbox>
			</cm-checkbox-group>
		`)
	})
})
