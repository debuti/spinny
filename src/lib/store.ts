import { createStore, get, set } from 'idb-keyval';
import * as v from 'valibot';
import { MAX_LABEL, MAX_OPTIONS } from './wheel';

/**
 * The options text, on this device only. apps.nubuza.com apps share an origin, so the
 * database has the app's own name. Not encrypted: it's a list of choices, the user
 * writes it to share it (see PLAN.md).
 */
const store = typeof indexedDB === 'undefined' ? undefined : createStore('spinny', 'kv');
const KEY = 'options';
const Saved = v.pipe(v.string(), v.maxLength(MAX_OPTIONS * (MAX_LABEL + 1) * 4));

export async function loadText(): Promise<string | undefined> {
	if (!store) return undefined;
	const parsed = v.safeParse(Saved, await get(KEY, store));
	return parsed.success ? parsed.output : undefined;
}

export async function saveText(text: string): Promise<void> {
	if (store) await set(KEY, text, store);
}
