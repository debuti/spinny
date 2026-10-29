import { describe, expect, it } from 'vitest';
import { MESSAGES, plural } from './index';

type Tree = { [k: string]: unknown };

function leaves(o: unknown, path = ''): Map<string, string> {
	const out = new Map<string, string>();
	if (typeof o === 'string') out.set(path, o);
	else if (o && typeof o === 'object')
		for (const [k, v] of Object.entries(o as Tree))
			for (const [p, s] of leaves(v, `${path}.${k}`)) out.set(p, s);
	return out;
}

const holes = (s: string) => [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort();

describe('i18n', () => {
	it('every language has the same keys and placeholders as Spanish', () => {
		const root = leaves(MESSAGES.es);
		for (const [, m] of Object.entries(MESSAGES)) {
			const l = leaves(m);
			expect([...l.keys()]).toEqual([...root.keys()]);
			for (const [k, s] of root) expect(holes(l.get(k)!)).toEqual(holes(s));
		}
	});
	it('plurals', () => {
		expect(plural(MESSAGES.es.count, 1, 'es')).toBe('1 opción');
		expect(plural(MESSAGES.en.count, 3, 'en')).toBe('3 options');
	});
});
