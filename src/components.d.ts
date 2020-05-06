/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface CmButton {
        "appearance": "primary" | "secondary" | "danger";
        "disabled": boolean;
        "label": string;
    }
    interface CmCard {
        "headline": string;
        "simple": boolean;
    }
    interface CmCheckbox {
        "checked": boolean;
        "disabled": boolean;
        "indeterminate": boolean;
        "label": string;
    }
    interface CmLink {
        "href": string;
        "label": string;
        "openIn": "sameTab" | "newTab";
        "subtle": boolean;
    }
    interface CmSelect {
        "disabled": boolean;
        "options": Array<{
            label: string;
            value: string;
        }>;
    }
    interface CmText {
        "appearance": "bold" | "subtle" | "normal";
    }
    interface CmToggle {
        "checked": boolean;
        "disabled": boolean;
        "label": string;
    }
}
declare global {
    interface HTMLCmButtonElement extends Components.CmButton, HTMLStencilElement {
    }
    var HTMLCmButtonElement: {
        prototype: HTMLCmButtonElement;
        new (): HTMLCmButtonElement;
    };
    interface HTMLCmCardElement extends Components.CmCard, HTMLStencilElement {
    }
    var HTMLCmCardElement: {
        prototype: HTMLCmCardElement;
        new (): HTMLCmCardElement;
    };
    interface HTMLCmCheckboxElement extends Components.CmCheckbox, HTMLStencilElement {
    }
    var HTMLCmCheckboxElement: {
        prototype: HTMLCmCheckboxElement;
        new (): HTMLCmCheckboxElement;
    };
    interface HTMLCmLinkElement extends Components.CmLink, HTMLStencilElement {
    }
    var HTMLCmLinkElement: {
        prototype: HTMLCmLinkElement;
        new (): HTMLCmLinkElement;
    };
    interface HTMLCmSelectElement extends Components.CmSelect, HTMLStencilElement {
    }
    var HTMLCmSelectElement: {
        prototype: HTMLCmSelectElement;
        new (): HTMLCmSelectElement;
    };
    interface HTMLCmTextElement extends Components.CmText, HTMLStencilElement {
    }
    var HTMLCmTextElement: {
        prototype: HTMLCmTextElement;
        new (): HTMLCmTextElement;
    };
    interface HTMLCmToggleElement extends Components.CmToggle, HTMLStencilElement {
    }
    var HTMLCmToggleElement: {
        prototype: HTMLCmToggleElement;
        new (): HTMLCmToggleElement;
    };
    interface HTMLElementTagNameMap {
        "cm-button": HTMLCmButtonElement;
        "cm-card": HTMLCmCardElement;
        "cm-checkbox": HTMLCmCheckboxElement;
        "cm-link": HTMLCmLinkElement;
        "cm-select": HTMLCmSelectElement;
        "cm-text": HTMLCmTextElement;
        "cm-toggle": HTMLCmToggleElement;
    }
}
declare namespace LocalJSX {
    interface CmButton {
        "appearance"?: "primary" | "secondary" | "danger";
        "disabled"?: boolean;
        "label"?: string;
        "onCmPress"?: (event: CustomEvent<{
            triggeredBy: "Keyboard" | "Mouse";
        }>) => void;
    }
    interface CmCard {
        "headline"?: string;
        "simple"?: boolean;
    }
    interface CmCheckbox {
        "checked"?: boolean;
        "disabled"?: boolean;
        "indeterminate"?: boolean;
        "label"?: string;
        "onCmInput"?: (event: CustomEvent<{
            isChecked: boolean;
        }>) => void;
    }
    interface CmLink {
        "href"?: string;
        "label"?: string;
        "openIn"?: "sameTab" | "newTab";
        "subtle"?: boolean;
    }
    interface CmSelect {
        "disabled"?: boolean;
        "onCmInput"?: (event: CustomEvent<{
            newValue: string;
        }>) => void;
        "options"?: Array<{
            label: string;
            value: string;
        }>;
    }
    interface CmText {
        "appearance"?: "bold" | "subtle" | "normal";
    }
    interface CmToggle {
        "checked"?: boolean;
        "disabled"?: boolean;
        "label"?: string;
        "onCmInput"?: (event: CustomEvent<{
            isChecked: boolean;
        }>) => void;
    }
    interface IntrinsicElements {
        "cm-button": CmButton;
        "cm-card": CmCard;
        "cm-checkbox": CmCheckbox;
        "cm-link": CmLink;
        "cm-select": CmSelect;
        "cm-text": CmText;
        "cm-toggle": CmToggle;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "cm-button": LocalJSX.CmButton & JSXBase.HTMLAttributes<HTMLCmButtonElement>;
            "cm-card": LocalJSX.CmCard & JSXBase.HTMLAttributes<HTMLCmCardElement>;
            "cm-checkbox": LocalJSX.CmCheckbox & JSXBase.HTMLAttributes<HTMLCmCheckboxElement>;
            "cm-link": LocalJSX.CmLink & JSXBase.HTMLAttributes<HTMLCmLinkElement>;
            "cm-select": LocalJSX.CmSelect & JSXBase.HTMLAttributes<HTMLCmSelectElement>;
            "cm-text": LocalJSX.CmText & JSXBase.HTMLAttributes<HTMLCmTextElement>;
            "cm-toggle": LocalJSX.CmToggle & JSXBase.HTMLAttributes<HTMLCmToggleElement>;
        }
    }
}
