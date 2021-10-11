import { newSpecPage } from '@stencil/core/testing'
import { CmTextfield } from '../cm-textfield'

describe('cm-textfield', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [CmTextfield],
			html: `<cm-textfield></cm-textfield>`,
		})
		expect(page.root).toEqualHtml(`
			<cm-textfield form-name="" helper-text="" label="" label-alignment="vertical" placeholder="" type="text">
				<mock:shadow-root>
					<label class="Light container vertical">
						<div class="labelContainer">
							<div class="label"></div>
							<cm-text appearance="helperText" class="helperText" color="subtle"></cm-text>
						</div>
						<div class="inputContainer">
							<div class="empty prefix"></div>
							<input placeholder="" tabindex="0" type="text" value="" />
							<div class="asyncStatusIndicator"></div>
							<div class="empty suffix"></div>
						</div>
						<div class="errorMessage"></div>
					</label>
				</mock:shadow-root>
			</cm-textfield>
		`)
	})
})
