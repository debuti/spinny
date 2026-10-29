import { resolve } from '$app/paths';
import type { ResolvedPathname } from '$app/types';
import type { Locale } from './i18n';

/** The app's public address: canonical and hreflang links point here. */
export const SITE = 'https://apps.nubuza.com/spinny';

export const PAGES = ['', 'privacy', 'terms'] as const;
export type Page = (typeof PAGES)[number];

/** A page's path below the base, in a language. */
export function pagePath(locale: Locale, page: Page): string {
	return `${locale === 'es' ? '' : `/${locale}`}/${page ? `${page}/` : ''}`;
}

export function pathLocale(pathname: string): Locale {
	return pathname.split('/')[1] === 'en' ? 'en' : 'es';
}

/** A page's link, through SvelteKit's typed resolve() (Spanish leaves [[lang]] out). */
export function link(locale: Locale, page: Page): ResolvedPathname {
	const lang = locale === 'es' ? undefined : locale;
	return page
		? resolve(`/[[lang=locale]]/${page}`, { lang })
		: resolve('/[[lang=locale]]', { lang });
}
