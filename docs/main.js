import { DamageCalculator } from "./DamageCalculator.js";
import { DamageCalculatorResult } from "./DamageCalculatorResult.js";
import { ToggleTip } from "./ToggleTip.js";

customElements.define('damage-calculator', DamageCalculator);
customElements.define('damage-calculator-result', DamageCalculatorResult);

if (
	window.CSS
	&& window.CSS.supports('anchor-name', '--anchor-name')
	&& window.CSS.supports('position-area', 'block-start span-all')
) {
	customElements.define('toggle-tip', ToggleTip);
} else {
	const toggletips = document.querySelectorAll('toggle-tip[for]');
	toggletips.forEach((toggletip) => {
		const input = document.getElementById(toggletip.getAttribute('for'));
		if (input) {
			const randomId = crypto.randomUUID();
			toggletip.id = randomId;
			input.setAttribute('aria-describedby', randomId);
		}
	});
}