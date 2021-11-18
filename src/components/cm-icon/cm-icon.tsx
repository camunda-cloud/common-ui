import { Component, Host, h, Prop, State, Watch } from '@stencil/core'
import {
	ColorMap,
	getVariableValue,
	onThemeChange,
	Theme,
} from '../../globalHelpers'

const colorVariableMap: ColorMap = {
	bright: {
		Light: '--cm-color-ui-light4',
		Dark: '--cm-color-ui-dark4',
	},
	medium: {
		Light: '--cm-color-ui-light6',
		Dark: '--cm-color-ui-light3',
	},
	dark: {
		Light: '--cm-color-ui-dark4',
		Dark: '--cm-color-ui-light4',
	},
	success: {
		Light: '--cm-color-green-base',
		Dark: '--cm-color-green-base',
	},
	warning: {
		Light: '--cm-color-orange-base',
		Dark: '--cm-color-orange-base',
	},
	danger: {
		Light: '--cm-color-red-base',
		Dark: '--cm-color-red-base',
	},
}

@Component({
	tag: 'cm-icon',
	styleUrl: 'cm-icon.scss',
	shadow: true,
})
export class CmIcon {
	@Prop({ mutable: true }) icon:
		| 'check'
		| 'closeSmall'
		| 'close'
		| 'closeLarge'
		| 'contextMenu'
		| 'copy'
		| 'delete'
		| 'document'
		| 'down'
		| 'edit'
		| 'email'
		| 'external'
		| 'help'
		| 'hide'
		| 'information'
		| 'left'
		| 'minus'
		| 'plus'
		| 'right'
		| 'search'
		| 'show'
		| 'sort'
		| 'stop'
		| 'up'
		| 'warning'
		| 'window'
		| 'state:completed'
		| 'state:incident'
		| 'state:ok'

	@Prop({ mutable: true }) color:
		| 'bright'
		| 'medium'
		| 'dark'
		| 'success'
		| 'warning'
		| 'danger' = 'dark'

	@Prop({ mutable: true }) ignoreTheme: boolean = false

	@State() theme: Theme = 'Light'
	@State() resolvedColor = ''
	@State() resolvedContrastColor = ''

	@Watch('color') colorWatch() {
		getVariableValue(this.getResolvedColorName(this.color)).then(
			(resolvedColor) => {
				this.resolvedColor = resolvedColor
			},
		)
	}

	componentWillLoad() {
		onThemeChange((theme) => {
			this.theme = theme

			getVariableValue(this.getResolvedColorName(this.color)).then(
				(resolvedColor) => {
					this.resolvedColor = resolvedColor
				},
			)

			if (this.color === 'bright') {
				getVariableValue(this.getResolvedColorName('dark')).then(
					(resolvedColor) => {
						this.resolvedContrastColor = resolvedColor
					},
				)
			} else {
				getVariableValue(this.getResolvedColorName('bright')).then(
					(resolvedColor) => {
						this.resolvedContrastColor = resolvedColor
					},
				)
			}
		})
	}

	getResolvedColorName(color: this['color'], forceIgnoreTheme = false) {
		let resolvedTheme = this.theme

		if (this.ignoreTheme || forceIgnoreTheme) {
			resolvedTheme = 'Light'
		}

		return colorVariableMap[color][resolvedTheme]
	}

	getIconSVG() {
		const fill = this.resolvedColor
		const contrastFill = this.resolvedContrastColor

		switch (this.icon) {
			case 'check':
				return (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
					>
						<path
							fill={fill}
							d="M5.74339606 13.3137085L1 8.57031244l1.89735842-1.89735842 2.84603764 2.84603763 7.35924554-7.35924552L15 4.05710456z"
						/>
					</svg>
				)
			case 'closeSmall':
				return (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="8"
						height="8"
					>
						<path
							fill={fill}
							d="m7 0 1 1-3 3 3 3-1 1-3-3-3 3-1-1 3-3.001L0 1l1-1 3 3 3-3Z"
						/>
					</svg>
				)
			case 'close':
				return (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
					>
						<path
							fill={fill}
							d="M13.65685425 3.75735931L9.41421356 8l4.24264069 4.24264069-1.41421356 1.41421356L8 9.41421356l-4.24264069 4.24264069-1.41421356-1.41421356L6.58578644 8 2.34314575 3.75735931l1.41421356-1.41421356L8 6.58578644l4.24264069-4.24264069 1.41421356 1.41421356z"
						/>
					</svg>
				)
			case 'closeLarge':
				return (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
					>
						<path
							fill={fill}
							d="M16.1282588 4.8145503l-5.18568546 5.1847426 5.18568545 5.1861568-.94280908.9428091L10 10.94186622 4.8145503 16.1282588l-.9428091-.94280908 5.18568546-5.18615682-5.18568545-5.1847426.94280908-.94280908L10 9.05671955l5.1854497-5.18497834.9428091.94280908z"
						/>
					</svg>
				)
			case 'contextMenu':
				return (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
					>
						<path
							fill={fill}
							d="M10 14.5c.82842712 0 1.5.6715729 1.5 1.5s-.67157288 1.5-1.5 1.5-1.5-.6715729-1.5-1.5.67157288-1.5 1.5-1.5zm0-6c.82842712 0 1.5.67157288 1.5 1.5s-.67157288 1.5-1.5 1.5-1.5-.67157288-1.5-1.5.67157288-1.5 1.5-1.5zm0-6c.82842712 0 1.5.67157288 1.5 1.5s-.67157288 1.5-1.5 1.5S8.5 4.82842712 8.5 4s.67157288-1.5 1.5-1.5z"
						/>
					</svg>
				)
			case 'copy':
				return (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
					>
						<g fill={fill}>
							<path d="M7.23076923 1L8.922 2.692l-4.22969231.00030769V12.8461538H4c-.55228475 0-1-.4477152-1-1V2c0-.55228475.44771525-1 1-1h3.23076923z" />
							<path d="M9.76923077 3.53846154l1.69123077 1.692h-.018l.865.874v-.028L14 7.76923077v6.61538463c0 .5522847-.4477152 1-1 1H6.53846154c-.55228475 0-1-.4477153-1-1V4.53846154c0-.55228475.44771525-1 1-1h3.23076923zm-.00076923 1.692l-2.53769231.00030769v8.46153847h5.07692308l-.00023077-5.92384616-2.53823077.00076923-.00076923-2.53876923z" />
						</g>
					</svg>
				)
			case 'delete':
				return (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
					>
						<path
							fill={fill}
							d="M13.5 3v1h-1v9c0 1.1045695-.8954305 2-2 2h-5c-1.1045695 0-2-.8954305-2-2V4h-1V3c0-.55228475.44771525-1 1-1h2c0-.55228475.44771525-1 1-1h3c.55228475 0 1 .44771525 1 1h2c.5522847 0 1 .44771525 1 1zm-8 1v8c0 .5522847.44771525 1 1 1h3c.55228475 0 1-.4477153 1-1V4h-5zm2 8h1-1zm-1-7h1v7h-1V5zm2 0h1v7h-1V5z"
						/>
					</svg>
				)
			case 'document':
				return (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
					>
						<path
							fill={fill}
							d="M8 1l2 2h-.022L11 4.033V4l1.999 1.999L13 14c0 .5522847-.44771525 1-1 1H4c-.55228475 0-1-.4477153-1-1V2c0-.55228475.44771525-1 1-1h4zm0 2H5v10h6V6H8V3z"
						/>
					</svg>
				)
			case 'down':
				return (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
					>
						<path
							fill={fill}
							d="M8.00017911 11.44956836L3.05043164 6.49982089 4.4646452 5.08560733l3.5355339 3.53553391 3.5355339-3.5355339 1.41421357 1.41421356-4.94974746 4.94974746z"
						/>
					</svg>
				)
			case 'edit':
				return (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
					>
						<path
							fill={fill}
							d="M3 11l1.99792969 2.0035156-2.99324219 1.0007617L3 11zm9.8-10L15 3.20221356 6.2 12 4 9.79832288 12.8 1z"
						/>
					</svg>
				)
			case 'email':
				return (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
					>
						<path
							fill={fill}
							d="M2 5.00883682l7.63444351 6.28967368c.21047699.1723514.51330549.1723514.72378239 0l7.6373222-6.20512138v9.76070298c0 .3155146-.2557657.5712803-.5712803.5712803H2.57128033C2.25576569 15.4253724 2 15.1696067 2 14.8540921V5.00883682zM17.4242678 4c.0284184.00338075.0565021.0091046.0839832.01713808L9.99779079 10.1171548 2.57128033 4z"
						/>
					</svg>
				)
			case 'external':
				return (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
					>
						<path
							fill={fill}
							d="M8 2v1.4H3.4v9.2h9.2V8.48515907H14V14H2V2h6zm6 0v5.20391037L12.203 5.205 8.70710678 8.70185425 7.29289322 7.28764069 10.863 3.716 9.32042868 2H14z"
						/>
					</svg>
				)
			case 'help':
				return (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
					>
						<path
							fill={fill}
							d="M10 0c5.5228475 0 10 4.4771525 10 10s-4.4771525 10-10 10S0 15.5228475 0 10 4.4771525 0 10 0zm.9914286 13.9890867H8.99297424v1.9984543h1.99845436v-1.9984543zm-.99925061-9.99222487c-2.2082904 0-3.99686183 1.78861826-3.99686183 3.99686182h1.99845433c0-1.09915691.89929743-1.99845433 1.99845433-1.99845433 1.09915688 0 1.99840748.89934426 1.99840748 1.99850117 0 1.99845433-2.99765806 1.74861827-2.99765806 4.99611241h1.99845436c0-2.2482436 2.9976581-2.4980328 2.9976581-4.99611241 0-2.2082904-1.7886183-3.99690866-3.99690871-3.99690866z"
						/>
					</svg>
				)
			case 'hide':
				return (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
					>
						<g fill={fill}>
							<path d="M8.0467033 6.79591837c-1.0230179 0-1.85439561.82345982-1.85439561 1.83673469s.83137771 1.8367347 1.85439561 1.8367347c1.0230179 0 1.8543956-.82345983 1.8543956-1.8367347s-.83140668-1.83673469-1.8543956-1.83673469z" />
							<path d="M8.0467033 3.85714286c-3.20305242 0-5.93844062 1.980225-7.0467033 4.7755102 1.10826268 2.79525536 3.84365088 4.77551024 7.0467033 4.77551024 3.2062354 0 5.9384406-1.98025488 7.0467033-4.77551024-1.1082627-2.7952852-3.8404679-4.7755102-7.0467033-4.7755102zm0 7.95916377c-1.76807941 0-3.20305242-1.42629566-3.20305242-3.18368342 0-1.75738775 1.43497301-3.18365357 3.20305242-3.18365357 1.7680794 0 3.2030524 1.42629567 3.2030524 3.18368342 0 1.75738776-1.434973 3.18365357-3.2030524 3.18365357z" />
							<path d="M2.2593456 12.43994848l9.28077648-9.19238815c.36713821-.36364166.95868705-.36364166 1.32582522 0 .36262971.35917607.36542942.94431527.00625331 1.30694499a.92378857.92378857 0 01-.0062533.0062533L3.5851708 13.75314678c-.36713819.36364164-.95868702.36364164-1.32582522 0-.3626297-.35917608-.3654294-.94431528-.00625331-1.30694497a.92379638.92379638 0 01.00625332-.00625333z" />
						</g>
					</svg>
				)
			case 'information':
				return (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
					>
						<path
							fill={fill}
							d="M10 2c4.418278 0 8 3.581722 8 8s-3.581722 8-8 8-8-3.581722-8-8 3.581722-8 8-8zm1.41538462 7.1H8.03076923v.9h.61538462v3.6H8v.9h4v-.9h-.58461538V9.1zm-1.44-3.6c-.76347693 0-1.38461539.60561-1.38461539 1.35 0 .74439.62113846 1.35 1.38461539 1.35C10.73886154 8.2 11.36 7.59439 11.36 6.85c0-.74439-.62113846-1.35-1.38461538-1.35z"
						/>
					</svg>
				)
			case 'left':
				return (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
					>
						<path
							fill={fill}
							d="M4.55043164 8.00017911l4.94974747-4.94974747 1.41421356 1.41421356-3.53553391 3.5355339 3.5355339 3.5355339-1.41421356 1.41421357-4.94974746-4.94974746z"
						/>
					</svg>
				)
			case 'minus':
				return (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
					>
						<path fill={fill} d="M3 7h10v2H3z" />
					</svg>
				)
			case 'plus':
				return (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
					>
						<path
							fill={fill}
							d="M9 3v3.999L13 7v2H9v4H7V9H3V7h4V3h2z"
						/>
					</svg>
				)
			case 'right':
				return (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
					>
						<path
							fill={fill}
							d="M11.44956836 7.99982089l-4.94974747 4.94974747-1.41421356-1.41421356 3.53553391-3.5355339-3.5355339-3.5355339L6.4998209 3.05007343l4.94974746 4.94974746z"
						/>
					</svg>
				)
			case 'search':
				return (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
					>
						<path
							fill={fill}
							d="M8.6008622 2c3.6455555 0 6.6008622 2.91053515 6.6008622 6.5008622 0 1.44371288-.4778551 2.77750755-1.2862933 3.8563433L18 16.3835568 16.3601272 18l-4.1284855-4.0691809c-1.04160891.6769012-2.28947413 1.0709053-3.6307795 1.0709053C4.95530667 15.0017244 2 12.0911892 2 8.5008622 2 4.91053515 4.95530667 2 8.6008622 2zm0 2C6.05987617 4 4 6.01510464 4 8.5008622c0 2.48575755 2.05987617 4.5008622 4.6008622 4.5008622 2.54098602 0 4.6008622-2.01510465 4.6008622-4.5008622C13.2017244 6.01510464 11.14184822 4 8.6008622 4z"
						/>
					</svg>
				)
			case 'show':
				return (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
					>
						<g fill={fill}>
							<path d="M8.0467033 6.37712288c-1.0230179 0-1.85439561.80618444-1.85439561 1.7982018 0 .99201735.83137771 1.79820179 1.85439561 1.79820179 1.0230179 0 1.8543956-.80618444 1.8543956-1.79820179 0-.99201736-.83140668-1.7982018-1.8543956-1.7982018z" />
							<path d="M8.0467033 3.5C4.84365088 3.5 2.10826268 5.43868182 1 8.17532468c1.10826268 2.73661363 3.84365088 4.67532467 7.0467033 4.67532467 3.2062354 0 5.9384406-1.93871104 7.0467033-4.67532467C13.9851439 5.43868182 11.2529387 3.5 8.0467033 3.5zm0 7.79218831c-1.76807941 0-3.20305242-1.39637337-3.20305242-3.11689286 0-1.72051948 1.43497301-3.11686363 3.20305242-3.11686363 1.7680794 0 3.2030524 1.39637337 3.2030524 3.11689286 0 1.72051948-1.434973 3.11686363-3.2030524 3.11686363z" />
						</g>
					</svg>
				)
			case 'sort':
				return (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
					>
						<path
							fill={fill}
							d="M2 16h6v-2H2v2zM2 4v2h16V4H2zm0 7h11V9H2v2z"
						/>
					</svg>
				)
			case 'stop':
				return (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
					>
						<path
							fill={fill}
							d="M5.42855151 12.2889629C6.17989881 12.7404026 7.0596333 13 8 13c2.76142375 0 5-2.23857625 5-5 0-.9403667-.2595974-1.82010119-.7110371-2.57144849L5.42855151 12.2889629zm-1.47589089-1.35253622l6.98376606-6.98376606C10.11192198 3.35343147 9.09723516 3 8 3 5.23857625 3 3 5.23857625 3 8c0 1.09723516.35343147 2.11192198.95266062 2.93642668zM8 15c-3.86599325 0-7-3.1340068-7-7 0-3.86599325 3.13400675-7 7-7 3.8659932 0 7 3.13400675 7 7 0 3.8659932-3.1340068 7-7 7z"
						/>
					</svg>
				)
			case 'up':
				return (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
					>
						<path
							fill={fill}
							d="M7.99982089 4.55043164l4.94974747 4.94974747-1.41421356 1.41421356-3.5355339-3.53553391-3.5355339 3.5355339L3.05007343 9.5001791l4.94974746-4.94974746z"
						/>
					</svg>
				)
			case 'warning':
				return (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
					>
						<path
							fill={fill}
							d="M8.49613894 2.1473213c.15503128.0885893.2835149.21707292.3721042.3721042l6.27682036 10.9844356c.2740099.4795174.1074132 1.0903721-.3721042 1.364382-.1510977.0863416-.322112.1317569-.496139.1317569H1.72317968c-.55228475 0-1-.4477153-1-1 0-.1740269.04541532-.3450412.13175686-.4961389L7.13175686 2.5194255c.27400997-.47951745.88486463-.64611418 1.36438208-.3721042zM9 11H7v2h2v-2zm.5-5.5h-3l.7610545 4.5h1.49397234L9.5 5.5z"
						/>
					</svg>
				)
			case 'state:completed':
				return (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
					>
						<path
							fill-rule="evenodd"
							fill={fill}
							d="M11.551 4.48A5 5 0 1 0 13 8h2a7 7 0 1 1-.839-3.325l-.015.015.003.005-1.34 1.341-.148.15-5.125 5.128L4 7.778l1.414-1.414 2.122 2.121L11.55 4.48Z"
						/>
					</svg>
				)
			case 'state:ok':
				return (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
					>
						<path
							fill-rule="evenodd"
							fill={fill}
							d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14Zm0-2A5 5 0 1 0 8 3a5 5 0 0 0 0 10Zm0-1a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z"
						/>
					</svg>
				)
			case 'state:incident':
				return (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
					>
						<g fill="none" fill-rule="evenodd">
							<circle cx="8" cy="8" r="7" fill={fill} />
							<path
								fill={contrastFill}
								d="M7 10h2v2H7v-2Zm.261-1L6.5 4h3l-.745 5H7.261Z"
							/>
						</g>
					</svg>
				)
			case 'window':
				return (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
					>
						<path
							fill={fill}
							d="M1 2h11v9H1V2Zm2 2v5h7V4H3Zm10 8V4h2v10H3v-2h10Z"
						/>
					</svg>
				)
		}
	}

	render() {
		return <Host>{this.getIconSVG()}</Host>
	}
}
