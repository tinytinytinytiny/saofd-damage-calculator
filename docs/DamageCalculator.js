export class DamageCalculator extends HTMLElement {
	constructor() {
		super();
		this.form = this.querySelector('form');
		this.variables = {};
		this.value = {
			normal: 0,
			critical: 0
		};

		this.addEventListener('change', this);
		this.addEventListener('input', this);
	}

	connectedCallback() {
		const formData = new FormData(this.form).entries();

		for (const [key, value] of formData) {
			this.variables[key] = Number(value);
		}

		this.calc();
	}

	handleEvent(event) {
		this[`on${event.type}`](event);
	}

	onchange(event) {
		this.updateVariable(event.target.name);
		this.calc();
	}

	oninput(event) {
		this.updateVariable(event.target.name);
		this.calc();
	}

	updateVariable(variable) {
		if (variable in this.variables) {
			const formData = new FormData(this.form);
			this.variables[variable] = Number(formData.get(variable));
		}
	}

	static addMultiplicativeBuff(base, buff) {
		return base + base * buff;
	}

	calc() {
		const { actionDamage, attackQuartz, baseAttack, buffsPassivesAttack, characterRankAttack, criticalDamage, elementalWeaknessMultiplier, enemyPartMultiplier, meleeRangedDamage, memoriesAttack, modAttack, specialEffectsAttack, statusAilmentMultiplier, weaponAttack, weaponWeakPointDamage } = this.variables;
		const { addMultiplicativeBuff } = this.constructor;

		const attack = [
			baseAttack,
			weaponAttack / 100,
			(specialEffectsAttack / 100 + memoriesAttack / 100),
			characterRankAttack / 100,
			(buffsPassivesAttack / 100 + modAttack / 100 + attackQuartz / 100)
		].reduce(addMultiplicativeBuff);
		this.querySelector('#attack').textContent = attack;

		const multipliers = [
			1.3 * actionDamage / 100 * weaponWeakPointDamage / 100 * enemyPartMultiplier,
			elementalWeaknessMultiplier / 100,
			meleeRangedDamage / 100,
			statusAilmentMultiplier / 100
		].reduce(addMultiplicativeBuff);
		this.querySelector('#multipliers').textContent = multipliers;

		this.value.normal = Math.ceil(attack * multipliers);
		this.value.critical = Math.ceil(addMultiplicativeBuff(this.value.normal, criticalDamage / 100));
		this.querySelector('damage-calculator-result').setAttribute('damage', this.value.normal);
		this.querySelector('damage-calculator-result').setAttribute('criticaldamage', this.value.critical);
	}
}