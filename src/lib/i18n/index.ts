import { en } from './en';
import { es } from './es';

export type Messages = typeof en;
export type Plural = { one: string; other: string } & Partial<Record<Intl.LDMLPluralRule, string>>;
export const LOCALES = ['en', 'es'] as const;
export type Locale = (typeof LOCALES)[number];

export const MESSAGES: Record<Locale, Messages> = { en, es };

/** Replaces {name} placeholders. Values are inserted as text (Svelte escapes on render). */
export function fmt(template: string, params: Record<string, string | number> = {}): string {
	return template.replace(/\{(\w+)\}/g, (whole, key: string) =>
		key in params ? String(params[key]) : whole
	);
}

/** Picks the right plural form and fills {n} with the localized number. */
export function plural(p: Plural, n: number, locale: Locale): string {
	const form = p[new Intl.PluralRules(locale).select(n)] ?? p.other;
	return fmt(form, { n: new Intl.NumberFormat(locale).format(n) });
}
