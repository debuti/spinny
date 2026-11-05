<script lang="ts">
	import { page } from '$app/state';
	import { base } from '$app/paths';
	import { ADS_ON, reopenConsent } from '$lib/ads';
	import { link, pagePath, PAGES } from '$lib/paths';

	let { data, children } = $props();
	const m = $derived(data.m);
	const here = $derived(
		PAGES.find((p) => pagePath(data.locale, p) === page.url.pathname.slice(base.length)) ?? ''
	);
</script>

{@render children()}

<footer>
	<a href="https://nubuza.com">{m.footer.by}</a>
	<a href={link(data.locale, 'privacy')}>{m.footer.privacy}</a>
	<a href={link(data.locale, 'terms')}>{m.footer.terms}</a>
	<a
		href={link(data.locale === 'en' ? 'es' : 'en', here)}
		hreflang={data.locale === 'en' ? 'es' : 'en'}>{m.footer.lang}</a
	>
	{#if ADS_ON}<button onclick={reopenConsent}>{m.footer.consent}</button>{/if}
	<span>v{__APP_VERSION__}</span>
</footer>

<style>
	footer {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 8px 18px;
		padding: 28px 16px calc(28px + env(safe-area-inset-bottom, 0px));
		font-size: 0.9rem;
		color: var(--text-soft);
	}
	footer a,
	footer button {
		color: var(--text-soft);
	}
	footer button {
		padding: 0;
		border: 0;
		background: none;
		font-weight: 700;
		text-decoration: underline;
	}
</style>
