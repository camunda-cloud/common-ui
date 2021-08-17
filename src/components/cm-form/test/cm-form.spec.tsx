import { newSpecPage } from '@stencil/core/testing'
import { CmForm } from '../cm-form'

describe('cm-form', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [CmForm],
			html: `<cm-form></cm-form>`,
		})
		expect(page.root).toEqualHtml(`
			<cm-form>
				<mock:shadow-root>
					<slot></slot>
				</mock:shadow-root>
			</cm-form>
		`)
	})
})
