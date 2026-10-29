<script lang="ts">
	import { link } from '$lib/paths';

	let { data } = $props();
	const c = $derived(data.m.privacy);
</script>

<svelte:head><title>{c.title} · Spinny</title></svelte:head>

<main class="prose">
	<p><a href={link(data.locale, '')}>← Spinny</a></p>
	<h1>{c.title}</h1>
	<div class="card">
		{#each c.body as para, i (i)}<p>{para}</p>{/each}
	</div>
</main>

<style>
	h1 {
		margin: 8px 0 16px;
	}
</style>
