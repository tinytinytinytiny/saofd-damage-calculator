export class DamageCalculatorResult extends HTMLElement {
	static formAssociated = true;

	constructor() {
		super();
		this.internals_ = this.attachInternals();
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.innerHTML = `
			<style>
				* { box-sizing: border-box; }
				output { display: block; }
				.main {
					font-size: var(--text-step-2);
					font-weight: 700;
					letter-spacing: var(--tracking-tight);
					line-height: var(--leading-tight);
				}
				.fixed {
					background-color: var(--background-body);
					border-block-start: 1px solid;
					inset-block-end: 0;
					inset-inline: 0;
					padding-block-start: var(--space-step-0);
					padding-block-end: calc(var(--space-step-0) + env(safe-area-inset-bottom, 0px));
					padding-inline: var(--space-step-1);
					position: fixed;
					transition: display 0.2s allow-discrete, transform 0.15s ease;
					transform: none;
					& p {
						margin: 0;
					}
					@starting-style {
						transform: translateY(100%);
					}
					&[hidden] {
						transform: translateY(100%);
					}
				}
			</style>
			<div class="main">
				<output>
					Total Damage: <span data-name="damage">0</span>
				</output>
				<output>
					Total Critical Damage: <span data-name="criticaldamage">0</span>
				</output>
			</div>
			<div class="fixed" aria-hidden="true">
				<p>Total Damage: <span data-name="damage">0</span></p>
				<p>Total Critical Damage: <span data-name="criticaldamage">0</span></p>
			</div>
		`;

		let formVisible = false;
		let mainVisible = false;

		this.observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.target === this.shadowRoot.querySelector('.main')) {
					mainVisible = entry.isIntersecting;
				}
				if (entry.target === this.internals_.form) {
					formVisible = entry.isIntersecting;
				}
			});

			if (mainVisible || !formVisible) {
				this.shadowRoot.querySelector('.fixed').toggleAttribute('hidden', true);
			} else {
				this.shadowRoot.querySelector('.fixed').toggleAttribute('hidden', false);
			}
		});
	}

	connectedCallback() {
		this.observer.observe(this.shadowRoot.querySelector('.main'));
		this.observer.observe(this.internals_.form);
	}

	disconnectedCallback() {
		this.observer.disconnect();
	}

	static get observedAttributes() {
		return ['damage', 'criticaldamage'];
	}

	attributeChangedCallback(name, _, currentValue) {
		const correspondingValues = this.shadowRoot.querySelectorAll(`[data-name="${name}"]`);
		if (correspondingValues.length) {
			correspondingValues.forEach(value => value.textContent = currentValue);
		}
	}
}