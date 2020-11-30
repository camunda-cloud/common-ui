import { addParameters } from '@storybook/react'

addParameters({
	viewMode: 'docs',
	options: {
		storySort: (a, b) => {
			// TODO: Define a full ordering list and set up a generic handling of such a list

			// NOTE: Put the Introduction on the very top, afterwards folders on top, in alphabetical order.

			if (a[1].kind === 'Introduction') {
				return -1
			}

			if (b[1].kind === 'Introduction') {
				return 1
			}

			const folderDepthDelta =
				b[1].kind.split('/').length - a[1].kind.split('/').length
			if (folderDepthDelta !== 0) {
				return folderDepthDelta
			}

			return a[1].kind === b[1].kind
				? 0
				: a[1].id.localeCompare(b[1].id, { numeric: true })
		},
	},
})
