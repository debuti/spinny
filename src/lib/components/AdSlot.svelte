<script lang="ts">
	import { onMount } from 'svelte';
	import { ADS_CLIENT, ADS_ON, ADS_SLOT_HOME, requestAd } from '$lib/ads';

	let { label }: { label: string } = $props();

	onMount(() => {
		if (ADS_ON) requestAd();
	});
</script>

{#if ADS_ON}
	<aside>
		<p>{label}</p>
		<ins
			class="adsbygoogle"
			data-ad-client={ADS_CLIENT}
			data-ad-slot={ADS_SLOT_HOME}
			data-ad-format="auto"
			data-full-width-responsive="true"
		></ins>
	</aside>
{/if}

<style>
	aside {
		margin-top: 32px;
		text-align: center;
	}
	p {
		margin: 0 0 6px;
		font-size: 0.8rem;
		color: var(--text-soft);
	}
	ins {
		display: block;
	}
</style>
