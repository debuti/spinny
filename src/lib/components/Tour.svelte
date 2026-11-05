<script lang="ts">
	import { onMount } from 'svelte';
	import { asset } from '$app/paths';
	import type { Messages } from '$lib/i18n';

	let { m }: { m: Messages['tour'] } = $props();

	const SEEN = 'spinny.tourSeen'; // Also read by static/tour-flag.js.

	let dialog = $state<HTMLDialogElement>();
	let next = $state<HTMLButtonElement>();
	let step = $state(0);
	const last = $derived(step === m.steps.length - 1);

	/** From the prerendered, non-modal dialog to a modal one: focus trap, Esc and backdrop. */
	export function open() {
		step = 0;
		dialog?.showModal();
		next?.focus();
	}

	onMount(() => {
		// Not close(): its close event would count as having seen the intro.
		dialog?.removeAttribute('open');
		const html = document.documentElement;
		if (html.classList.contains('tour-seen')) html.classList.remove('tour-seen');
		else open();
	});

	function seen() {
		try {
			localStorage.setItem(SEEN, '1');
		} catch {
			// Storage blocked: the intro shows again next time.
		}
	}

	function forward() {
		if (last) dialog?.close();
		else step++;
	}
</script>

<!-- Open in the HTML: this text is what crawlers and new visitors get first. -->
<dialog bind:this={dialog} class="tour" open aria-label={m.label} onclose={seen}>
	<img src={asset('/favicon.svg')} alt="" width="96" height="96" />
	<div aria-live="polite">
		{#each m.steps as s, i (i)}
			<div class="step" class:on={i === step}>
				<h2>{s.title}</h2>
				<p>{s.text}</p>
			</div>
		{/each}
	</div>
	<p class="count">{step + 1} / {m.steps.length}</p>
	<div class="tools">
		{#if !last}<button class="btn ghost" onclick={() => dialog?.close()}>{m.skip}</button>{/if}
		{#if step > 0}<button class="btn" onclick={() => step--}>{m.back}</button>{/if}
		<button bind:this={next} class="btn primary" onclick={forward}>
			{last ? m.start : m.next}
		</button>
	</div>
</dialog>

<style>
	:global(html.tour-seen) .tour {
		display: none;
	}
	.tour {
		position: fixed;
		inset: 0;
		z-index: 10;
		width: min(92vw, 440px);
		max-height: 92dvh;
		margin: auto;
		overflow-y: auto;
		border: 0;
		border-radius: var(--radius-lg);
		padding: 28px 24px;
		text-align: center;
		color: var(--text);
		box-shadow: var(--shadow-soft);
	}
	.tour::backdrop {
		background: rgba(58, 46, 63, 0.35);
	}
	.step {
		display: none;
	}
	.step.on {
		display: block;
	}
	h2 {
		margin: 12px 0 8px;
		font-size: 1.6rem;
		color: var(--coral-600);
	}
	.step p {
		margin: 0;
	}
	.count {
		margin: 12px 0;
		color: var(--text-soft);
		font-weight: 700;
	}
	.tools {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		justify-content: center;
	}
	.ghost {
		background: none;
	}
</style>
