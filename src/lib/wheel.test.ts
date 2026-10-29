import { describe, expect, it } from 'vitest';
import {
	decodeShare,
	encodeShare,
	parseOptions,
	randomInt,
	sliceAt,
	sliceColor,
	targetRotation
} from './wheel';

describe('parseOptions', () => {
	it('trims, drops blanks and caps', () => {
		expect(parseOptions('  pizza \n\n sushi\n   \n')).toEqual(['pizza', 'sushi']);
		expect(parseOptions('x\n'.repeat(500))).toHaveLength(100);
		expect(parseOptions('a'.repeat(80))[0]).toHaveLength(60);
	});
});

describe('randomInt', () => {
	it('stays in range and rejects the biased tail', () => {
		const seq = [0xffff_ffff, 7];
		expect(randomInt(3, () => seq.shift()!)).toBe(1);
		for (let i = 0; i < 200; i++) expect(randomInt(5)).toBeLessThan(5);
		expect(() => randomInt(0)).toThrow();
	});
});

describe('targetRotation', () => {
	it('lands on the winner, moving forward', () => {
		for (const n of [1, 2, 3, 7, 12, 100])
			for (let w = 0; w < n; w++)
				for (const cur of [0, 123.4, 7200 + 17]) {
					const r = targetRotation(cur, w, n, 5, Math.random());
					expect(r).toBeGreaterThan(cur + 5 * 360 - 1);
					expect(sliceAt(r, n)).toBe(w);
				}
	});
});

describe('sliceColor', () => {
	it('never repeats a neighbour', () => {
		for (let n = 2; n <= 40; n++)
			for (let i = 0; i < n; i++) expect(sliceColor(i, n)).not.toBe(sliceColor((i + 1) % n, n));
	});
});

describe('share links', () => {
	it('round-trips unicode', () => {
		const opts = ['Paella 🥘', 'Ñoquis', '寿司'];
		expect(decodeShare(encodeShare(opts))).toEqual(opts);
	});
	it('rejects junk', () => {
		expect(decodeShare('!!!')).toBeNull();
		expect(decodeShare('')).toBeNull();
		expect(decodeShare(encodeShare(['a'.repeat(61)]))).toBeNull();
	});
});
