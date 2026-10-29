<script lang="ts">
	import { onMount, tick } from 'svelte';
	import Wheel from '$lib/components/Wheel.svelte';
	import { fmt, plural } from '$lib/i18n';
	import { loadText, saveText } from '$lib/store';
	import {
		decodeShare,
		encodeShare,
		MAX_LABEL,
		MAX_OPTIONS,
		parseOptions,
		randomInt,
		targetRotation
	} from '$lib/wheel';

	let { data } = $props();
	const m = $derived(data.m);

	let text = $state('');
	let loaded = $state(false);
	let rotation = $state(0);
	let duration = $state(0);
	let spinning = $state(false);
	let winner = $state<string | null>(null);
	let toast = $state('');
	let dialog = $state<HTMLDialogElement>();

	const typed = $derived(parseOptions(text));
	// Something to look at before the first options are typed.
	const shown = $derived(typed.length ? typed : parseOptions(m.placeholder));
	const canSpin = $derived(typed.length >= 2 && !spinning);

	onMount(async () => {
		const hash = location.hash;
		if (hash.startsWith('#w=')) {
			const shared = decodeShare(hash.slice(3));
			history.replaceState(null, '', location.pathname);
			if (shared) {
				text = shared.join('\n');
				say(m.sharedLoaded);
			} else say(m.sharedBad);
		}
		if (!text) text = (await loadText()) ?? '';
		loaded = true;
	});

	$effect(() => {
		const t = text;
		if (loaded) void saveText(t);
	});

	let toastTimer: ReturnType<typeof setTimeout> | undefined;
	function say(msg: string) {
		toast = msg;
		clearTimeout(toastTimer);
		toastTimer = setTimeout(() => (toast = ''), 2600);
	}

	let pick = -1;
	function spin() {
		if (!canSpin) return;
		const n = typed.length;
		pick = randomInt(n);
		const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
		duration = reduced ? 0.6 : 4.6 + Math.random() * 0.8;
		rotation = targetRotation(rotation, pick, n, reduced ? 1 : 6, Math.random());
		spinning = true;
	}

	function stopped() {
		if (!spinning) return;
		spinning = false;
		winner = typed[pick] ?? null;
		navigator.vibrate?.(30);
		dialog?.showModal();
	}

	async function removeAndSpin() {
		const lines = text.split('\n');
		const at = lines.findIndex((l) => l.trim().slice(0, MAX_LABEL) === winner);
		if (at >= 0) lines.splice(at, 1);
		text = lines.join('\n');
		dialog?.close();
		await tick();
		spin();
	}

	function again() {
		dialog?.close();
		spin();
	}

	function shuffle() {
		const a = [...typed];
		for (let i = a.length - 1; i > 0; i--) {
			const j = randomInt(i + 1);
			[a[i], a[j]] = [a[j]!, a[i]!];
		}
		text = a.join('\n');
	}

	async function share() {
		const url = `${location.origin}${location.pathname}#w=${encodeShare(typed)}`;
		if (navigator.share) {
			try {
				await navigator.share({ title: 'Spinny', url });
			} catch {
				// Cancelled.
			}
			return;
		}
		await navigator.clipboard.writeText(url);
		say(m.copied);
	}

	function clear() {
		if (confirm(m.confirmClear)) text = '';
	}
</script>

<svelte:head><title>{m.meta.title}</title></svelte:head>

<main>
	<header>
		<h1>Spinny</h1>
		<p>{m.tagline}</p>
	</header>

	<div class="layout">
		<section class="stage">
			<button
				class="wheel-btn"
				onclick={spin}
				disabled={!canSpin}
				aria-label={m.spin}
				tabindex="-1"
			>
				<Wheel
					options={shown}
					{rotation}
					{duration}
					label={fmt(m.wheelLabel, { n: shown.length })}
					onstop={stopped}
				/>
			</button>
			<button class="btn primary big" onclick={spin} disabled={!canSpin}>
				{spinning ? m.spinning : m.spin}
			</button>
			{#if typed.length < 2}<p class="hint">{m.needTwo}</p>{/if}
		</section>

		<section class="card editor">
			<label for="options">
				<h2>{m.options}</h2>
				<span>{m.optionsHint} · {plural(m.count, typed.length, data.locale)}</span>
			</label>
			<textarea
				id="options"
				bind:value={text}
				placeholder={m.placeholder}
				rows="9"
				maxlength={MAX_OPTIONS * (MAX_LABEL + 1)}
				disabled={spinning}
				spellcheck="false"
			></textarea>
			<div class="tools">
				<button class="btn" onclick={shuffle} disabled={spinning || typed.length < 2}
					>🔀 {m.shuffle}</button
				>
				<button class="btn" onclick={share} disabled={typed.length < 2}>🔗 {m.share}</button>
				<button class="btn" onclick={clear} disabled={spinning || !text}>🧹 {m.clear}</button>
			</div>
		</section>
	</div>

	<section class="card faq">
		<h2>{m.faqTitle}</h2>
		{#each m.faq as f, i (i)}
			<details>
				<summary>{f.q}</summary>
				<p>{f.a}</p>
			</details>
		{/each}
	</section>
</main>

<dialog bind:this={dialog} aria-labelledby="result">
	<p class="label">{m.result}</p>
	<p id="result" class="winner">{winner}</p>
	<div class="tools">
		<button class="btn primary" onclick={again}>🎡 {m.again}</button>
		{#if typed.length > 2}
			<button class="btn" onclick={removeAndSpin}>✂️ {m.removeAndSpin}</button>
		{/if}
		<button class="btn" onclick={() => dialog?.close()}>{m.close}</button>
	</div>
</dialog>

<div class="toast" role="status" aria-live="polite">
	{#if toast}<span>{toast}</span>{/if}
</div>

<style>
	main {
		max-width: 1000px;
		margin: 0 auto;
		padding: 20px 16px 0;
	}
	header {
		text-align: center;
		margin-bottom: 20px;
	}
	h1 {
		font-size: 2.6rem;
		color: var(--coral-600);
	}
	header p {
		margin: 4px 0 0;
		color: var(--text-soft);
		font-weight: 700;
	}
	.layout {
		display: grid;
		gap: 24px;
		align-items: start;
	}
	@media (min-width: 820px) {
		.layout {
			grid-template-columns: 1.2fr 1fr;
		}
	}
	.stage {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20px;
		padding-top: 12px;
	}
	.wheel-btn {
		all: unset;
		display: block;
		width: 100%;
		cursor: pointer;
	}
	.wheel-btn:disabled {
		cursor: default;
	}
	.hint {
		margin: -8px 0 0;
		color: var(--text-soft);
	}
	.editor label {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 8px;
		margin-bottom: 10px;
	}
	.editor label span {
		color: var(--text-soft);
		font-size: 0.9rem;
	}
	textarea {
		width: 100%;
		resize: vertical;
		border: 2px solid var(--coral-100);
		border-radius: var(--radius-md);
		padding: 12px 14px;
		background: #fffdfc;
		line-height: 1.6;
	}
	textarea:focus {
		outline: none;
		border-color: var(--coral-300);
	}
	.tools {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-top: 12px;
		justify-content: center;
	}
	.faq {
		margin-top: 32px;
	}
	.faq h2 {
		margin-bottom: 8px;
	}
	summary {
		cursor: pointer;
		font-weight: 800;
		padding: 10px 0;
	}
	details p {
		margin: 0 0 10px;
		color: var(--text-soft);
	}
	dialog {
		border: 0;
		border-radius: var(--radius-lg);
		padding: 28px 24px;
		max-width: min(92vw, 440px);
		text-align: center;
		box-shadow: var(--shadow-soft);
	}
	dialog::backdrop {
		background: rgba(58, 46, 63, 0.35);
	}
	dialog[open] {
		animation: pop 0.35s cubic-bezier(0.2, 1.6, 0.4, 1);
	}
	@keyframes pop {
		from {
			transform: scale(0.7);
			opacity: 0;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		dialog[open] {
			animation: none;
		}
	}
	.label {
		margin: 0;
		color: var(--text-soft);
		font-weight: 700;
	}
	.winner {
		margin: 8px 0 12px;
		font-family: var(--font-display);
		font-size: 2.2rem;
		font-weight: 600;
		color: var(--coral-600);
		overflow-wrap: anywhere;
	}
	.toast {
		position: fixed;
		left: 50%;
		bottom: calc(20px + env(safe-area-inset-bottom, 0px));
		transform: translateX(-50%);
		pointer-events: none;
	}
	.toast span {
		display: block;
		padding: 10px 18px;
		border-radius: var(--radius-pill);
		background: var(--ink);
		color: var(--white);
		font-weight: 700;
	}
</style>
