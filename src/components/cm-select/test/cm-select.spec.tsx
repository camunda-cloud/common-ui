import { newSpecPage } from '@stencil/core/testing'
import { CmSelect } from '../cm-select'

describe('cm-select', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [CmSelect],
			html: `<cm-select></cm-select>`,
		})
		expect(page.root).toEqualHtml(`
			<cm-select form-name="" helper-text="" label="" label-alignment="vertical" placeholder="">
				<mock:shadow-root>
					<label class="Light container vertical">
						<div class="labelContainer">
							<div class="label"></div>
							<cm-text appearance="helperText" color="subtle"></cm-text>
						</div>
						<div class="valueLabelContainer" tabindex="0">
							<div class="empty prefix"></div>
							<div class="valueLabel"></div>
							<div class="icon suffix">
								<cm-icon icon="down"></cm-icon>
							</div>
							<div class="flyout"></div>
						</div>
						<div class="errorMessage"></div>
					</label>
				</mock:shadow-root>
			</cm-select>
		`)
	})
})
