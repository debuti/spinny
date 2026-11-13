import * as v from 'valibot';
import { MAX_LABEL, MAX_OPTIONS, parseOptions } from './wheel';

export const MAX_LISTS = 50;
export const MAX_NAME = 40;

export const SavedList = v.object({
	name: v.pipe(v.string(), v.minLength(1), v.maxLength(MAX_NAME)),
	text: v.pipe(v.string(), v.maxLength(MAX_OPTIONS * (MAX_LABEL + 1) * 4))
});
export type SavedList = v.InferOutput<typeof SavedList>;
export const SavedLists = v.pipe(v.array(SavedList), v.maxLength(MAX_LISTS));

/** A name to suggest: the first options, cut to fit. */
export function suggestName(text: string): string {
	const s = parseOptions(text).slice(0, 3).join(', ');
	return s.length > MAX_NAME ? s.slice(0, MAX_NAME - 1).trimEnd() + '…' : s;
}

/** Same options in the same order, ignoring blank lines and spaces. */
export function sameOptions(a: string, b: string): boolean {
	return parseOptions(a).join('\n') === parseOptions(b).join('\n');
}

/**
 * Adds a list, or replaces the one with the same name (case-insensitive) in place.
 * Returns undefined when the name is empty or there's no room for a new one.
 */
export function upsert(lists: SavedList[], name: string, text: string): SavedList[] | undefined {
	const n = name.trim().slice(0, MAX_NAME);
	if (!n) return undefined;
	const item = { name: n, text: parseOptions(text).join('\n') };
	const at = lists.findIndex((l) => l.name.toLowerCase() === n.toLowerCase());
	if (at >= 0) return lists.map((l, i) => (i === at ? item : l));
	if (lists.length >= MAX_LISTS) return undefined;
	return [...lists, item].sort((a, b) => a.name.localeCompare(b.name));
}
