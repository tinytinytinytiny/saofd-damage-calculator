export class ToggleTip extends HTMLElement {
	constructor() {
		super();

		this.attachShadow({ mode: 'open' });
		this.shadowRoot.innerHTML = `
			<style>
				* {
					box-sizing: border-box;
				}
				:host {
					vertical-align: middle;
				}
				.solid { display: none; }
				button {
					anchor-name: --infobutton;
					background: none;
					border: none;
					border-radius: calc(infinity * 1px);
					cursor: pointer;
					display: inline-flex;
					margin: 0;
					outline: none;
					padding: 0;
					position: relative;
					&:before {
						content: '';
						position: absolute;
						inset: -12px;
					}
					&:focus {
						outline: 2px solid;
						outline-offset: 1px;
					}
					&:hover .outline,
					&:focus .outline {
						display: none;
					}
					&:hover .solid,
					&:focus .solid {
						display: block;
					}
				}
				[id="content"] {
					background: transparent;
					border: 0;
					box-shadow: 0 4px 16px -8px black;
					margin-block: var(--space-step-0);
					margin-inline: var(--space-step--1);
					padding: 0;
					position: absolute;
					position-anchor: --infobutton;
					position-area: block-start span-all;
					position-try-fallbacks:
						--move-right,
						--move-left,
						block-start span-inline-end,
						block-start span-inline-start,
						block-end span-inline-end,
						block-end span-inline-start,
						flip-block,
						flip-inline,
						flip-block flip-inline;
					position-try-order: most-inline-size;
					& p {
						background-color: black;
						color: var(--background-body);
						margin: 0;
						max-inline-size: 60ch;
						padding: var(--space-step-0);
						text-wrap: pretty;
					}
				}
				@position-try --move-right {
					inset-inline-start: calc(anchor(self-start) - var(--space-step-3));
					position-area: block-start span-inline-end;
				}
				@position-try --move-left {
					inset-inline-end: calc(anchor(self-end) - var(--space-step-3));
					position-area: block-start span-inline-start;
				}
			</style>
			<button type="button" popovertarget="content" aria-label="More info">
				<svg class="outline" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" width="15" height="15"><path d="M7 4.5V5h1v-.5H7zm1-.01v-.5H7v.5h1zM8 11V7H7v4h1zm0-6.5v-.01H7v.01h1zM6 8h1.5V7H6v1zm0 3h3v-1H6v1zM7.5 1A6.5 6.5 0 0114 7.5h1A7.5 7.5 0 007.5 0v1zM1 7.5A6.5 6.5 0 017.5 1V0A7.5 7.5 0 000 7.5h1zM7.5 14A6.5 6.5 0 011 7.5H0A7.5 7.5 0 007.5 15v-1zm0 1A7.5 7.5 0 0015 7.5h-1A6.5 6.5 0 017.5 14v1z" fill="currentColor"></path></svg>
				<svg class="solid" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" width="15" height="15"><path fill-rule="evenodd" clip-rule="evenodd" d="M15 7.5a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0zM7 5V3.99h1V5H7zm1 2v3h1v1H6v-1h1V8H6V7h2z" fill="currentColor"></path></svg>
			</button>
			<div popover id="content">
				<p><slot></slot></p>
			</div>
		`;
	}
}