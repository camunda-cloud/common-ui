import{Component,Host,h,Prop,Listen,Event,Method,Watch,State,Element}from"@stencil/core";export class CmCheckbox{constructor(){this.label="",this.helperText="",this.checked=!1,this.indeterminate=!1,this.disabled=!1,this.required=!1,this.formName="",this.forceRenderingOfValidationState=!1,this.forceHidingOfValidationState=!1,this.enableAttributeEmit=!1}checkedChangeHandler(){this.enableAttributeEmit&&(this.resetValidationForces(),this.cmInput.emit({isChecked:this.checked,triggeredBy:"API"}),this.validationResult&&!this.validationResult.isValid&&this.checkValidity())}handleKeyDown(event){" "===event.key&&(this.disabled||(this.toggleCheck({triggeredBy:"User"}),event.preventDefault()))}handleClick(){this.disabled||this.toggleCheck({triggeredBy:"User"})}async toggleCheck(options={}){var _a;this.disabled&&!options.forceToggle||(this.checked=!this.checked,this.resetValidationForces(),this.cmInput.emit({isChecked:this.checked,triggeredBy:null!==(_a=options.triggeredBy)&&void 0!==_a?_a:"API"}),this.validationResult&&!this.validationResult.isValid&&this.checkValidity())}async check(options={}){var _a;this.disabled&&!options.forceCheck||!1===this.checked&&(this.checked=!0,this.resetValidationForces(),this.cmInput.emit({isChecked:this.checked,triggeredBy:null!==(_a=options.triggeredBy)&&void 0!==_a?_a:"API"}),this.validationResult&&!this.validationResult.isValid&&this.checkValidity())}async uncheck(options={}){var _a;this.disabled&&!options.forceUncheck||!0===this.checked&&(this.checked=!1,this.resetValidationForces(),this.cmInput.emit({isChecked:this.checked,triggeredBy:null!==(_a=options.triggeredBy)&&void 0!==_a?_a:"API"}),this.validationResult&&!this.validationResult.isValid&&this.checkValidity())}async reset(){this.checked=!1,this.validationResult=void 0}async forceFocus(){this.element.shadowRoot.querySelector(".container").focus()}async checkValidity(){if(this.required)if(this.checked)this.validationResult={isValid:!0};else{let validationInput=document.createElement("input");validationInput.type="checkbox",validationInput.required=!0,this.validationResult={isValid:!1,type:"invalid",message:validationInput.validationMessage}}else this.validationResult={isValid:!0};return this.validationResult}async renderValidity(){this.checkValidity(),this.forceRenderingOfValidationState=!0,this.forceHidingOfValidationState=!1}async hideValidity(){this.forceRenderingOfValidationState=!1,this.forceHidingOfValidationState=!0}resetValidationForces(){this.forceHidingOfValidationState=!1,this.forceRenderingOfValidationState=!1}renderErrorMessage(){var _a;return this.forceHidingOfValidationState?h("div",{class:"errorMessage"}):!1===(null===(_a=this.validationResult)||void 0===_a?void 0:_a.isValid)?h("div",{class:"errorMessage"},h("cm-icon",{color:"danger",icon:"warning"}),this.validationResult.message):h("div",{class:"errorMessage"})}render(){let checkboxClasses={checkbox:!0,indeterminate:this.indeterminate,checked:this.checked,disabled:this.disabled},tabIndex=0;return this.disabled&&(tabIndex=-1),h(Host,null,h("div",{class:{container:!0,disabled:this.disabled,hasError:this.validationResult&&!this.validationResult.isValid&&!this.forceHidingOfValidationState},tabindex:tabIndex},h("div",{class:checkboxClasses,ref:element=>this.checkbox=element,role:"checkbox","aria-disabled":this.disabled}),h("label",null,this.label),h("cm-text",{appearance:"helperText",color:"subtle"},this.helperText),this.renderErrorMessage()))}static get is(){return"cm-checkbox"}static get encapsulation(){return"shadow"}static get originalStyleUrls(){return{$:["cm-checkbox.scss"]}}static get styleUrls(){return{$:["cm-checkbox.css"]}}static get properties(){return{label:{type:"string",mutable:!0,complexType:{original:"string",resolved:"string",references:{}},required:!1,optional:!1,docs:{tags:[],text:""},attribute:"label",reflect:!0,defaultValue:"''"},helperText:{type:"string",mutable:!0,complexType:{original:"string",resolved:"string",references:{}},required:!1,optional:!1,docs:{tags:[],text:""},attribute:"helper-text",reflect:!0,defaultValue:"''"},checked:{type:"boolean",mutable:!0,complexType:{original:"boolean",resolved:"boolean",references:{}},required:!1,optional:!1,docs:{tags:[],text:""},attribute:"checked",reflect:!0,defaultValue:"false"},indeterminate:{type:"boolean",mutable:!0,complexType:{original:"boolean",resolved:"boolean",references:{}},required:!1,optional:!1,docs:{tags:[],text:""},attribute:"indeterminate",reflect:!0,defaultValue:"false"},disabled:{type:"boolean",mutable:!0,complexType:{original:"boolean",resolved:"boolean",references:{}},required:!1,optional:!1,docs:{tags:[],text:""},attribute:"disabled",reflect:!0,defaultValue:"false"},required:{type:"boolean",mutable:!0,complexType:{original:"boolean",resolved:"boolean",references:{}},required:!1,optional:!1,docs:{tags:[],text:""},attribute:"required",reflect:!0,defaultValue:"false"},formName:{type:"string",mutable:!0,complexType:{original:"string",resolved:"string",references:{}},required:!1,optional:!1,docs:{tags:[],text:""},attribute:"form-name",reflect:!0,defaultValue:"''"},enableAttributeEmit:{type:"boolean",mutable:!0,complexType:{original:"boolean",resolved:"boolean",references:{}},required:!1,optional:!1,docs:{tags:[],text:"Enables `cmInput` Events being emitted when the checked attribute changes."},attribute:"enable-attribute-emit",reflect:!0,defaultValue:"false"}}}static get states(){return{validationResult:{},forceRenderingOfValidationState:{},forceHidingOfValidationState:{}}}static get events(){return[{method:"cmInput",name:"cmInput",bubbles:!0,cancelable:!0,composed:!0,docs:{tags:[],text:"Emitted whenever the checked state changes."},complexType:{original:"{\n\t\tisChecked: boolean\n\t\ttriggeredBy: 'User' | 'API'\n\t}",resolved:'{ isChecked: boolean; triggeredBy: "User" | "API"; }',references:{}}}]}static get methods(){return{toggleCheck:{complexType:{signature:"(options?: { forceToggle?: boolean; triggeredBy?: 'User' | 'API'; }) => Promise<void>",parameters:[{tags:[],text:""}],references:{Promise:{location:"global"}},return:"Promise<void>"},docs:{text:"Toggles the checked state. Respects the disabled state, unless forced.",tags:[]}},check:{complexType:{signature:"(options?: { forceCheck?: boolean; triggeredBy?: 'User' | 'API'; }) => Promise<void>",parameters:[{tags:[],text:""}],references:{Promise:{location:"global"}},return:"Promise<void>"},docs:{text:"Sets the checked state to true. Respects the disabled state, unless forced.",tags:[]}},uncheck:{complexType:{signature:"(options?: { forceUncheck?: boolean; triggeredBy?: 'User' | 'API'; }) => Promise<void>",parameters:[{tags:[],text:""}],references:{Promise:{location:"global"}},return:"Promise<void>"},docs:{text:"Sets the checked state to false. Respects the disabled state, unless forced.",tags:[]}},reset:{complexType:{signature:"() => Promise<void>",parameters:[],references:{Promise:{location:"global"}},return:"Promise<void>"},docs:{text:"",tags:[]}},forceFocus:{complexType:{signature:"() => Promise<void>",parameters:[],references:{Promise:{location:"global"},HTMLDivElement:{location:"global"}},return:"Promise<void>"},docs:{text:"",tags:[]}},checkValidity:{complexType:{signature:"() => Promise<ValidatorResult>",parameters:[],references:{Promise:{location:"global"},ValidatorResult:{location:"import",path:"../../globalHelpers"}},return:"Promise<ValidatorResult>"},docs:{text:"",tags:[]}},renderValidity:{complexType:{signature:"() => Promise<void>",parameters:[],references:{Promise:{location:"global"}},return:"Promise<void>"},docs:{text:"",tags:[]}},hideValidity:{complexType:{signature:"() => Promise<void>",parameters:[],references:{Promise:{location:"global"}},return:"Promise<void>"},docs:{text:"",tags:[]}}}}static get elementRef(){return"element"}static get watchers(){return[{propName:"checked",methodName:"checkedChangeHandler"}]}static get listeners(){return[{name:"keydown",method:"handleKeyDown",target:void 0,capture:!1,passive:!1},{name:"click",method:"handleClick",target:void 0,capture:!1,passive:!1}]}}