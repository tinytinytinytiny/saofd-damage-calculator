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
}