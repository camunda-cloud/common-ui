import { newSpecPage } from '@stencil/core/testing'
import { CmRadiobutton } from '../cm-radiobutton'

describe('cm-radiobutton', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [CmRadiobutton],
			html: `<cm-radiobutton></cm-radiobutton>`,
		})
		expect(page.root).toEqualHtml(`
			<cm-radiobutton helper-text="" label="" value="">
				<mock:shadow-root>
					<div class="container" tabindex="0">
						<div class="radiobutton" role="radio"></div>
						<div class="beforeLabel empty">
							<slot name="beforeLabel"></slot>
						</div>
						<label></label>
						<div class="afterLabel empty">
							<slot name="afterLabel"></slot>
						</div>
						<cm-text appearance="helperText" color="subtle"></cm-text>
					</div>
				</mock:shadow-root>
			</cm-radiobutton>
		`)
	})
})
