import { describe, expect, it } from 'vitest';
import { MAX_LISTS, sameOptions, suggestName, upsert } from './lists';

describe('saved lists', () => {
	it('suggests a name from the first options', () => {
		expect(suggestName('Ana\n\nLuis\nEva\nPablo')).toBe('Ana, Luis, Eva');
		expect(suggestName('x'.repeat(60)).length).toBe(40);
	});
	it('compares options, not whitespace', () => {
		expect(sameOptions(' a\n\nb ', 'a\nb')).toBe(true);
		expect(sameOptions('a\nb', 'b\na')).toBe(false);
	});
	it('adds sorted, replaces by name, refuses empty names and overflow', () => {
		let l = upsert([], 'Team B', 'x\ny')!;
		l = upsert(l, 'Team A', ' a \n\nb')!;
		expect(l.map((x) => x.name)).toEqual(['Team A', 'Team B']);
		expect(l[0]!.text).toBe('a\nb');
		l = upsert(l, 'team b', 'z')!;
		expect(l).toHaveLength(2);
		expect(l[1]).toEqual({ name: 'team b', text: 'z' });
		expect(upsert(l, '  ', 'a')).toBeUndefined();
		const full = Array.from({ length: MAX_LISTS }, (_, i) => ({ name: `L${i}`, text: '' }));
		expect(upsert(full, 'new', 'a')).toBeUndefined();
		expect(upsert(full, 'L3', 'a')).toHaveLength(MAX_LISTS);
	});
});
