import { LOCALES } from '$lib/i18n';
import { PAGES, SITE, pagePath } from '$lib/paths';

export const prerender = true;

export function GET(): Response {
	const urls = PAGES.flatMap((p) =>
		LOCALES.map((l) => `<url><loc>${SITE}${pagePath(l, p)}</loc></url>`)
	);
	return new Response(
		`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join('')}</urlset>\n`,
		{ headers: { 'Content-Type': 'application/xml' } }
	);
}
