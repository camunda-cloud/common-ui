import{Component,Host,h,Prop}from"@stencil/core";export class CmCheckboxGroup{constructor(){this.label=""}render(){return h(Host,null,this.label?h("cm-text",{id:"label",appearance:"emphasis"},this.label):"",h("div",{class:"container"},h("slot",null)))}static get is(){return"cm-checkbox-group"}static get encapsulation(){return"shadow"}static get originalStyleUrls(){return{$:["cm-checkbox-group.scss"]}}static get styleUrls(){return{$:["cm-checkbox-group.css"]}}static get properties(){return{label:{type:"string",mutable:!1,complexType:{original:"string",resolved:"string",references:{}},required:!1,optional:!1,docs:{tags:[],text:""},attribute:"label",reflect:!1,defaultValue:"''"}}}}