import * as v from 'valibot';

export const MAX_OPTIONS = 100;
export const MAX_LABEL = 60;

/** Pastel slices; dark text reads on all of them (WCAG AA against --ink). */
export const PALETTE = [
	'#ffcdc5',
	'#fff1c2',
	'#c2ead4',
	'#d6eaff',
	'#e9e0ff',
	'#ffd9ec',
	'#ffe2bf',
	'#cdeff5'
] as const;

/** The colour of slice i out of n, never the same as a neighbour (the last touches the first). */
export function sliceColor(i: number, n: number): string {
	const len = PALETTE.length;
	if (n > 1 && i === n - 1 && i % len === 0) return PALETTE[Math.floor(len / 2)]!;
	return PALETTE[i % len]!;
}

/** Cleans up user text: one option per line, trimmed, no blanks, capped. */
export function parseOptions(text: string): string[] {
	return text
		.split('\n')
		.map((s) => s.trim().slice(0, MAX_LABEL))
		.filter((s) => s.length > 0)
		.slice(0, MAX_OPTIONS);
}

/** A uniform random integer in [0, n), from the platform's CSPRNG (no modulo bias). */
export function randomInt(n: number, rand = cryptoUint32): number {
	if (!Number.isInteger(n) || n <= 0) throw new RangeError('n must be a positive integer');
	const limit = Math.floor(0x1_0000_0000 / n) * n;
	let x: number;
	do x = rand();
	while (x >= limit);
	return x % n;
}

function cryptoUint32(): number {
	return crypto.getRandomValues(new Uint32Array(1))[0]!;
}

/**
 * Where the wheel stops. Slices run clockwise from the top, where the pointer is; the
 * wheel turns clockwise by `rotation` degrees. Lands somewhere inside the middle of the
 * winner's slice after a few full turns, always moving forward from `current`.
 */
export function targetRotation(
	current: number,
	winner: number,
	n: number,
	turns = 6,
	within = 0.5
): number {
	const slice = 360 / n;
	const at = (winner + 0.1 + 0.8 * within) * slice; // angle on the wheel under the pointer
	const want = mod(360 - at, 360);
	const delta = mod(want - mod(current, 360), 360);
	return current + turns * 360 + delta;
}

/** Which slice is under the pointer at a given rotation. */
export function sliceAt(rotation: number, n: number): number {
	return Math.min(n - 1, Math.floor(mod(360 - mod(rotation, 360), 360) / (360 / n)));
}

function mod(a: number, m: number): number {
	return ((a % m) + m) % m;
}

// ---- Share links: #w=<base64url of the options, one per line> ----------------------
// The fragment never reaches the server.

const Shared = v.pipe(
	v.array(v.pipe(v.string(), v.trim(), v.minLength(1), v.maxLength(MAX_LABEL))),
	v.minLength(1),
	v.maxLength(MAX_OPTIONS)
);

export function encodeShare(options: readonly string[]): string {
	const bytes = new TextEncoder().encode(options.join('\n'));
	let bin = '';
	for (const b of bytes) bin += String.fromCharCode(b);
	return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function decodeShare(code: string): string[] | null {
	try {
		const bin = atob(code.replace(/-/g, '+').replace(/_/g, '/'));
		const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
		const text = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
		const parsed = v.safeParse(Shared, text.split('\n'));
		return parsed.success ? parsed.output : null;
	} catch {
		return null;
	}
}
