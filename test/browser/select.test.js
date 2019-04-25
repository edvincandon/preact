import { createElement as h, render } from '../../src/index';
import { setupScratch, teardown } from '../_util/helpers';

/** @jsx h */

describe('Select', () => {
	let scratch;

	beforeEach(() => {
		scratch = setupScratch();
	});

	afterEach(() => {
		teardown(scratch);
	});

	it('should set <select> value', () => {
		function App() {
			return (
				<select value="B">
					<option value="A">A</option>
					<option value="B">B</option>
					<option value="C">C</option>
				</select>
			);
		}

		render(<App />, scratch);
		expect(scratch.firstChild.value).to.equal('B');
	});

	it('should set value with selected', () => {
		function App() {
			return (
				<select>
					<option value="A">A</option>
					<option selected value="B">B</option>
					<option value="C">C</option>
				</select>
			);
		}

		render(<App />, scratch);
		expect(scratch.firstChild.value).to.equal('B');
	});

	it('should work with multiple selected', () => {
		function App() {
			return (
				<select multiple>
					<option value="A">A</option>
					<option selected value="B">B</option>
					<option selected value="C">C</option>
				</select>
			);
		}

		render(<App />, scratch);
		Array.prototype.slice.call(scratch.firstChild.childNodes).forEach(node => {
			if (node.value === 'B' || node.value === 'C') {
				expect(node.selected).to.equal(true);
			}
		});
		expect(scratch.firstChild.value).to.equal('B');
	});

	it('should select multiple elements', () => {
		function App() {
			return (
				<select multiple value={['A', 'C']}>
					<option value="A">A</option>
					<option value="B">B</option>
					<option value="C">C</option>
				</select>
			);
		}

		render(<App />, scratch);
		Array.prototype.slice.call(scratch.firstChild.childNodes).forEach(node => {
			if (node.value === 'A' || node.value === 'C') {
				expect(node.selected).to.equal(true);
			}
		});
	});

	it('should reset multiple value', () => {
		function App({ condition }) {
			return (
				<select multiple value={condition ? ['A', 'C'] : []}>
					<option value="A">A</option>
					<option value="B">B</option>
					<option value="C">C</option>
				</select>
			);
		}

		render(<App condition />, scratch);
		Array.prototype.slice.call(scratch.firstChild.childNodes).forEach(node => {
			if (node.value === 'A' || node.value === 'C') {
				expect(node.selected).to.equal(true);
			}
		});

		render(<App condition={false} />, scratch);
		Array.prototype.slice.call(scratch.firstChild.childNodes).forEach(node => {
			expect(node.selected).to.equal(false);
		});
	});

	it('should select multiple with optgroups in-between', () => {
		function App() {
			return (
				<select multiple value={['A', 'C']}>
					<optgroup label="foo">
						<option value="A">A</option>
					</optgroup>
					<option value="B">B</option>
					<option value="C">C</option>
				</select>
			);
		}

		render(<App />, scratch);
		Array.prototype.slice.call(scratch.firstChild.childNodes).forEach(node => {
			if (node.value === 'A' || node.value === 'C') {
				expect(node.selected).to.equal(true);
			}
		});
	});
});
