<script lang="ts">
	import { sliceColor } from '$lib/wheel';

	let {
		options,
		rotation,
		duration,
		label,
		onstop
	}: {
		options: readonly string[];
		rotation: number;
		/** Seconds the current turn takes. */
		duration: number;
		label: string;
		onstop: () => void;
	} = $props();

	const C = 200; // centre of the 400×400 view box
	const R = 188;

	/** A point on the rim, `deg` clockwise from the top. */
	function rim(deg: number, r = R): [number, number] {
		const a = (deg * Math.PI) / 180;
		return [C + r * Math.sin(a), C - r * Math.cos(a)];
	}

	const slices = $derived.by(() => {
		const n = options.length;
		const step = 360 / n;
		return options.map((text, i) => {
			const [x0, y0] = rim(i * step);
			const [x1, y1] = rim((i + 1) * step);
			const large = step > 180 ? 1 : 0;
			return {
				text: text.length > 18 ? `${text.slice(0, 17)}…` : text,
				full: text,
				d: `M${C} ${C}L${x0} ${y0}A${R} ${R} 0 ${large} 1 ${x1} ${y1}Z`,
				fill: sliceColor(i, n),
				mid: (i + 0.5) * step
			};
		});
	});

	const fontSize = $derived(Math.max(9, Math.min(22, 260 / Math.max(options.length, 6))));
</script>

<div class="wheel" role="img" aria-label={label}>
	<svg viewBox="0 0 400 400" aria-hidden="true">
		<g
			class="spin"
			style="transform: rotate({rotation}deg); transition-duration: {duration}s"
			ontransitionend={onstop}
		>
			<circle cx={C} cy={C} r={R + 6} fill="#fff" />
			{#if slices.length === 1}
				<circle cx={C} cy={C} r={R} fill={slices[0]!.fill} />
			{:else}
				{#each slices as s, i (i)}
					<path d={s.d} fill={s.fill} stroke="#fff" stroke-width="2" />
				{/each}
			{/if}
			{#each slices as s, i (i)}
				<text
					transform="rotate({s.mid - 90} {C} {C})"
					x={C + R - 14}
					y={C}
					text-anchor="end"
					dominant-baseline="central"
					font-size={fontSize}><title>{s.full}</title>{s.text}</text
				>
			{/each}
		</g>
		<!-- Spinny, the mascot: a happy hub that doesn't turn. -->
		<g class="hub">
			<circle cx={C} cy={C} r="40" fill="#fffdf8" stroke="#ef5848" stroke-width="5" />
			<circle cx={C - 13} cy={C - 6} r="5" fill="#3a2e3f" />
			<circle cx={C + 13} cy={C - 6} r="5" fill="#3a2e3f" />
			<circle cx={C - 24} cy={C + 7} r="5" fill="#ffa598" opacity="0.7" />
			<circle cx={C + 24} cy={C + 7} r="5" fill="#ffa598" opacity="0.7" />
			<path
				d="M{C - 9} {C + 7}q9 9 18 0"
				fill="none"
				stroke="#3a2e3f"
				stroke-width="3.5"
				stroke-linecap="round"
			/>
		</g>
	</svg>
	<svg class="pointer" viewBox="0 0 40 48" aria-hidden="true">
		<path
			d="M20 46 4 12a16 16 0 1 1 32 0Z"
			fill="#ef5848"
			stroke="#fff"
			stroke-width="3"
			stroke-linejoin="round"
		/>
	</svg>
</div>

<style>
	.wheel {
		position: relative;
		width: min(100%, 440px);
		aspect-ratio: 1;
		margin: 0 auto;
		filter: drop-shadow(0 10px 22px rgba(201, 58, 46, 0.18));
	}
	svg {
		display: block;
		width: 100%;
		height: 100%;
	}
	.spin {
		transform-origin: 200px 200px;
		transition-property: transform;
		transition-timing-function: cubic-bezier(0.12, 0.6, 0.12, 1);
	}
	text {
		fill: #3a2e3f;
		font-family: var(--font-display);
		font-weight: 600;
	}
	.pointer {
		position: absolute;
		top: -4%;
		left: 50%;
		width: 11%;
		height: auto;
		transform: translateX(-50%);
		filter: drop-shadow(0 3px 3px rgba(0, 0, 0, 0.15));
	}
</style>
