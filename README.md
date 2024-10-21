# saofd-damage-calculator
https://tinytinytinytiny.github.io/saofd-damage-calculator/

## Findings
### Labelling `<output>` elements
`<output>` elements can receive accessible labels like so:
```
<label for="output">Result</label>
<output id="output">0</output>
```
or
```
<output aria-label="Result">0</output>
```
If multiple `<output>` elements are updated at the same time, however, the updated values and labels may be announced out of order. Rather than ascribing a programmatic label, it would be better to include the label as part of the `<output>`'s value:
```
<output>Result: 0</output>
```

### CSS anchor positioning bugs
Chrome has some problems recognizing anchors in shadow DOM elements:

- Chrome DevTools reports that anchor names assigned to shadow DOM elements are "not defined"
- I haven't been able to get more than one anchor working per web component

Trying to use `transition-behavior: allow-discrete` to animate popovers prevents position try fallbacks from working.

### CSS nesting good
Sass gay