import type { Messages } from './index';

export const en: Messages = {
	meta: {
		title: 'Spinny · Spin the wheel to pick between options',
		description:
			'Type your options, spin the wheel and let luck decide. Free, no sign-up, no annoying ads. Your options never leave your phone.'
	},
	tagline: "Can't decide? Spin the wheel.",
	options: 'Options',
	optionsHint: 'One per line',
	placeholder: 'Pizza\nSushi\nTacos',
	spin: 'Spin!',
	spinning: 'Spinning…',
	needTwo: 'Type at least two options',
	count: { one: '{n} option', other: '{n} options' },
	shuffle: 'Shuffle',
	share: 'Share wheel',
	copied: 'Link copied',
	clear: 'Clear',
	confirmClear: 'Delete all the options?',
	sharedLoaded: 'Shared wheel loaded',
	sharedBad: "That wheel link isn't valid",
	result: 'And the wheel says…',
	again: 'Again',
	removeAndSpin: 'Remove it and spin',
	close: 'Close',
	wheelLabel: 'Wheel with {n} options',
	faqTitle: 'FAQ',
	faq: [
		{
			q: 'Is it really random?',
			a: "Yes. The winner is picked with your browser's cryptographic generator (crypto.getRandomValues), with no bias, and the wheel spins to it. Every option has the same chance."
		},
		{
			q: 'Where are my options stored?',
			a: "Only on your device, in the browser's storage. We have no server and no database: we never see what you type."
		},
		{
			q: 'How do I share a wheel?',
			a: 'Tap “Share wheel”. The options travel inside the link itself (after the #), which never reaches any server.'
		},
		{
			q: 'How many options can I add?',
			a: 'Up to 100, of up to 60 characters each.'
		}
	],
	footer: {
		by: 'An app by nubuza',
		privacy: 'Privacy',
		terms: 'Terms',
		lang: 'Español'
	},
	privacy: {
		title: 'Privacy',
		body: [
			'Spinny is made by nubuza (nubuza.com). It runs entirely in your browser: no accounts, no server, no database of ours.',
			'Your options are stored only on your device (IndexedDB). Delete them with “Clear” or by clearing the site data in your browser.',
			'When you share a wheel, the options go inside the link, after the #. That part is never sent to any server; only whoever gets the link sees it.',
			'We use Cloudflare Web Analytics to count visits in aggregate. It uses no cookies and does not identify you.',
			'We set no cookies of our own. For any question, reach us through nubuza.com.'
		]
	},
	terms: {
		title: 'Terms',
		body: [
			'Spinny is made by nubuza ("we", "us"). By using it you accept these terms. If you don’t agree, please don’t use it. If you are under 14, a parent or guardian must accept them for you.',
			'Spinny is free. Use it for everyday choices; not for important decisions, prize draws or gambling.',
			"You're responsible for what you type and share. Don't put other people's personal data in a wheel.",
			'Acceptable use. Don’t use Spinny against the law or to harm anyone, and don’t try to break, overload, scrape or get around the security of the app or the services it uses.',
			'Outside services. Spinny relies on services run by others: Cloudflare (hosting). Their own terms apply when you use them. We don’t control them, can’t promise they will always be available and aren’t responsible for what they do or show. Any ads are served by those services, and we aren’t responsible for what they advertise.',
			'No warranty. Spinny is free and provided "as is" and "as available", without warranties of any kind, to the extent the law allows. We don’t promise that it is free of errors, uninterrupted, accurate or suitable for any particular purpose. You use it at your own risk and you are responsible for checking its results before relying on them, and for keeping your own backups. We may change, pause or stop the app, or any part of it, at any time.',
			'Liability. To the extent the law allows, we are not liable for indirect or consequential damages, loss of profit, lost data, wasted material, time or money, or for how you or anyone else uses the app or what it produces. If you use the app for a business or profession, our total liability to you is limited to €1. If someone makes a claim against us because you broke these terms or the law while using the app, you are responsible for it, to the extent the law allows. Nothing in these terms limits liability that the law doesn’t allow to be limited, such as for intent, gross negligence, death or personal injury, or your rights as a consumer.',
			'Changes to these terms. We may update these terms; the new version is published on this page with a new date. If you keep using the app after a change, you accept the new terms.',
			'Law and disputes. If something goes wrong, please write to us first at me@nubuza.com: most problems can be fixed quickly. These terms are governed by the laws of Spain. If you use the app as a consumer, you also keep the protection of the mandatory laws of the country where you live, and you can bring a claim in your local courts. If you use it for a business or profession, the courts of Spain have exclusive jurisdiction. If any part of these terms turns out to be invalid, the rest still applies.',
			'Copyright (c) 2026 nubuza, all rights reserved.'
		]
	}
};
