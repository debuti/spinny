<script lang="ts">
	import { onMount } from 'svelte';
	import { fmt, plural, type Locale, type Messages } from '$lib/i18n';
	import {
		MAX_LISTS,
		MAX_NAME,
		sameOptions,
		suggestName,
		upsert,
		type SavedList
	} from '$lib/lists';
	import { loadLists, saveLists } from '$lib/store';
	import { parseOptions } from '$lib/wheel';

	let {
		m,
		locale,
		text,
		disabled,
		onload,
		onsay
	}: {
		m: Messages;
		locale: Locale;
		text: string;
		disabled: boolean;
		onload: (text: string) => void;
		onsay: (msg: string) => void;
	} = $props();

	let lists = $state<SavedList[]>([]);
	let name = $state('');
	let named = $state(false); // The user typed a name: stop suggesting one.
	const canSave = $derived(parseOptions(text).length > 0 && !disabled);

	onMount(async () => {
		lists = await loadLists();
	});

	$effect(() => {
		const t = text;
		if (!named) name = suggestName(t);
	});

	async function store(next: SavedList[]) {
		lists = next;
		await saveLists($state.snapshot(lists));
	}

	async function save() {
		const n = name.trim();
		if (!n || !canSave) return;
		const exists = lists.find((l) => l.name.toLowerCase() === n.toLowerCase());
		if (
			exists &&
			!sameOptions(exists.text, text) &&
			!confirm(fmt(m.lists.overwrite, { name: exists.name }))
		)
			return;
		const next = upsert(lists, n, text);
		if (!next) return onsay(m.lists.full);
		await store(next);
		named = false;
		onsay(fmt(m.lists.saved, { name: n }));
	}

	function load(l: SavedList) {
		const current = parseOptions(text).length > 0;
		const kept = lists.some((x) => sameOptions(x.text, text));
		if (current && !kept && !sameOptions(l.text, text) && !confirm(m.lists.replaceCurrent)) return;
		onload(l.text);
		named = true;
		name = l.name;
		onsay(fmt(m.lists.loaded, { name: l.name }));
	}

	async function remove(l: SavedList) {
		if (!confirm(fmt(m.lists.confirmDelete, { name: l.name }))) return;
		await store(lists.filter((x) => x !== l));
	}
</script>

<section class="card lists" aria-labelledby="lists-title">
	<h2 id="lists-title">{m.lists.title}</h2>
	<p class="hint">{m.lists.hint}</p>
	<form
		onsubmit={(e) => {
			e.preventDefault();
			void save();
		}}
	>
		<label class="sr" for="list-name">{m.lists.name}</label>
		<input
			id="list-name"
			bind:value={name}
			oninput={() => (named = name.trim().length > 0)}
			placeholder={m.lists.name}
			maxlength={MAX_NAME}
			autocomplete="off"
		/>
		<button class="btn primary" disabled={!canSave || !name.trim()}>💾 {m.lists.save}</button>
	</form>
	{#if lists.length}
		<ul>
			{#each lists as l (l.name)}
				{@const active = sameOptions(l.text, text)}
				<li class:active>
					<span class="name">{l.name}</span>
					<span class="count">{plural(m.count, parseOptions(l.text).length, locale)}</span>
					<button
						class="btn small"
						onclick={() => load(l)}
						{disabled}
						aria-label={fmt(m.lists.loadLabel, { name: l.name })}>📂 {m.lists.load}</button
					>
					<button
						class="btn small"
						onclick={() => remove(l)}
						{disabled}
						aria-label={fmt(m.lists.deleteLabel, { name: l.name })}
						title={m.lists.delete}>🗑️</button
					>
				</li>
			{/each}
		</ul>
		{#if lists.length >= MAX_LISTS}<p class="hint">{m.lists.full}</p>{/if}
	{:else}
		<p class="hint empty">{m.lists.empty}</p>
	{/if}
</section>

<style>
	h2 {
		margin-bottom: 4px;
	}
	.hint {
		margin: 0 0 12px;
		color: var(--text-soft);
		font-size: 0.9rem;
	}
	.empty {
		margin: 12px 0 0;
	}
	form {
		display: flex;
		gap: 8px;
	}
	input {
		flex: 1;
		min-width: 0;
		border: 2px solid var(--coral-100);
		border-radius: var(--radius-pill);
		padding: 8px 14px;
		background: #fffdfc;
	}
	input:focus {
		outline: none;
		border-color: var(--coral-300);
	}
	ul {
		list-style: none;
		margin: 12px 0 0;
		padding: 0;
		display: grid;
		gap: 6px;
	}
	li {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 6px 6px 6px 14px;
		border-radius: var(--radius-md);
		background: #fffdfc;
		border: 2px solid transparent;
	}
	li.active {
		border-color: var(--coral-300);
	}
	.name {
		flex: 1;
		min-width: 0;
		font-weight: 800;
		overflow-wrap: anywhere;
	}
	.count {
		color: var(--text-soft);
		font-size: 0.85rem;
		white-space: nowrap;
	}
	.small {
		padding: 0.4em 0.9em;
	}
	.sr {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip: rect(0 0 0 0);
	}
</style>
