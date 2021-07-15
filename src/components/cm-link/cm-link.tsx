import {
	Component,
	ComponentInterface,
	Host,
	h,
	Prop,
	State,
} from '@stencil/core'
import { onThemeChange, Theme } from '../../globalHelpers'

@Component({
	tag: 'cm-link',
	styleUrl: 'cm-link.scss',
	shadow: true,
})
export class CmLink implements ComponentInterface {
	@Prop({ mutable: true }) href: string = ''
	@Prop({ mutable: true }) label: string = ''
	@Prop({ mutable: true }) openIn: 'sameTab' | 'newTab' = 'newTab'
	@State() theme: Theme = 'Light'

	componentWillLoad() {
		onThemeChange((theme) => {
			this.theme = theme
		})
	}

	render() {
		let classes = {
			[this.theme]: true,
		}
		let target = ''

		if (this.openIn === 'newTab') {
			target = '_blank'
		}

		return (
			<Host>
				<a class={classes} target={target} href={this.href}>
					{this.label}
					<svg
						width="12px"
						height="12px"
						viewBox="0 0 12 12"
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g
							stroke="none"
							stroke-width="1"
							fill="none"
							fill-rule="evenodd"
						>
							<path
								d="M6,0 L6,1.4 L1.4,1.4 L1.4,10.6 L10.6,10.6 L10.6,6.485 L12,6.485 L12,12 L0,12 L0,0 L6,0 Z M12,0 L12,5.204 L10.203,3.205 L6.707,6.702 L5.293,5.288 L8.863,1.716 L7.32,0 L12,0 Z"
								id="84qpaokpba"
								fill-rule="nonzero"
							></path>
						</g>
					</svg>
				</a>
			</Host>
		)
	}
}
