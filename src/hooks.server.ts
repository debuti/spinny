import type { Handle } from '@sveltejs/kit';
import { base } from '$app/paths';
import { MESSAGES, LOCALES } from '$lib/i18n';
import { PAGES, SITE, pagePath, pathLocale } from '$lib/paths';

/**
 * Runs at build time only (every page is prerendered): what crawlers must find in the
 * HTML itself — language, title, description, canonical and alternate links.
 */
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

export const handle: Handle = ({ event, resolve }) => {
	const path = event.url.pathname.slice(base.length) || '/';
	const locale = pathLocale(path);
	const page = PAGES.find((p) => pagePath(locale, p) === path);
	const m = MESSAGES[locale].meta;
	const head = [
		`<meta name="description" content="${esc(m.description)}" />`,
		`<meta property="og:title" content="${esc(m.title)}" />`,
		`<meta property="og:description" content="${esc(m.description)}" />`,
		`<meta property="og:locale" content="${locale === 'es' ? 'es_ES' : 'en_GB'}" />`,
		...(page === undefined
			? []
			: [
					...LOCALES.map(
						(l) => `<link rel="alternate" hreflang="${l}" href="${SITE}${pagePath(l, page)}" />`
					),
					`<link rel="alternate" hreflang="x-default" href="${SITE}${pagePath('en', page)}" />`
				])
	].join('');
	return resolve(event, {
		transformPageChunk: ({ html }) =>
			html
				.replace('<html lang="es">', `<html lang="${locale}">`)
				.replace('%spinny.head%', head)
				.replaceAll('%spinny.url%', `${SITE}${path}`)
	});
};
