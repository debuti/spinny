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
			'Spinny is free and provided as is, without warranties. Use it for everyday choices; not for important decisions, prize draws or gambling.',
			"You're responsible for what you type and share. Don't put other people's personal data in a wheel.",
			'Copyright (c) 2026 nubuza, all rights reserved.'
		]
	}
};
