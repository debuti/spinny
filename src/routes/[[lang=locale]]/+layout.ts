import { MESSAGES, type Locale } from '$lib/i18n';

/** The page's language comes from its URL. */
export const load = ({ params }: { params: { lang?: string } }) => {
	const locale: Locale = params.lang === 'en' ? 'en' : 'es';
	return { locale, m: MESSAGES[locale] };
};
