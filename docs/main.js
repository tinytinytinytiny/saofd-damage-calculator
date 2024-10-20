import { DamageCalculator } from "./DamageCalculator.js";
import { DamageCalculatorResult } from "./DamageCalculatorResult.js";
import { ToggleTip } from "./ToggleTip.js";

customElements.define('damage-calculator', DamageCalculator);
customElements.define('damage-calculator-result', DamageCalculatorResult);

if ('anchorName' in document.createElement('div').style) {
	customElements.define('toggle-tip', ToggleTip);
}