import { addParameters } from '@storybook/react';

addParameters({
	viewMode: 'docs',
	options: {
		storySort: (a, b) => {
			// TODO: Define a full ordering list and set up a generic handling of such a list

			if (a[1].kind === "Introduction") {
				return -1
			}

			if (b[1].kind === "Introduction") {
				return 1
			}

			return a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, { numeric: true })
		}
	},
});