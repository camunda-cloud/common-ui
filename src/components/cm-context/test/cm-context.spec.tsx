import { newSpecPage } from '@stencil/core/testing'
import { CmContext } from '../cm-context'

Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: jest.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		addEventListener: jest.fn(),
		removeEventListener: jest.fn(),
		dispatchEvent: jest.fn(),
	})),
})

describe('cm-context', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [CmContext],
			html: `<cm-context></cm-context>`,
		})

		expect(page.root).toEqualHtml(`
			<cm-context>
				<mock:shadow-root>
					<slot></slot>
				</mock:shadow-root>
			</cm-context>
		`)
	})
})
