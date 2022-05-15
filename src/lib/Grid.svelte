<script lang="ts" context="module">
	export interface Size {
		w: number;
		h: number;
	}

	export interface Position {
		x: number;
		y: number;
	}

	export interface Layout extends Size, Position {}

	export interface ItemCommons {
		key: unknown;
		movable?: boolean;
		resizable?: boolean;
		maxSize?: Partial<Size>;
		minSize?: Partial<Size>;
	}
</script>

<script lang="ts">
	// input props
	type ItemData = $$Generic;
	type Item = ItemData & ItemCommons;
	export let items: Item[];

	export let cols: number = 2;
	export let maxRows: number = Infinity;
	export let gravity: boolean = true;
	export let resetStyles: boolean = false;
	export let forgetUnusedLayouts: boolean = true;

	let className: string = '';
	export { className as class };

	// bind props
	export let layouts = new Map<unknown, Layout>();

	// update
	function updateLayout() {}

	function layoutFor(item: Item): Layout {
		const layout = layouts.get(item.key);
		if (layout) return layout;
	}
</script>

<div
	class={className}
	class:svelte-grid-outer={resetStyles}
	style:grid-cols={resetStyles ? '' : cols}
>
	{#each items as item (item.key)}
		<div
			style:grid-column={`${layoutFor(item).x} / ${layoutFor(item).x + layoutFor(item).w}`}
			style:grid-row={`${layoutFor(item).y} / ${layoutFor(item).y + layoutFor(item).h}`}
		>
			<slot key={item.key} {item}>{item.key}</slot>
		</div>
	{/each}
</div>

<style lang="scss">
	.svelte-grid-outer {
		display: grid;
	}
</style>
