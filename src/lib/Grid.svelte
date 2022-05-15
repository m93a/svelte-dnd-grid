<script lang="ts" context="module">
	export interface Size {
		w: number;
		h: number;
	}

	export interface Position {
		x: number;
		y: number;
	}

	export interface Layout extends Size, Position {

    }

    export interface ItemCommons extends Partial<Layout>{
        key: unknown;
    }
</script>

<script lang="ts">
	type ItemData = $$Generic;
	type Item = ItemData & ItemCommons;
	export let items: Item[];

	let className: string = '';
    export { className as class };
</script>

<div class={'svelte-grid-outer ' + className}>
	{#each items as item}
		{#key item.key}
			<slot key={item.key} {item} />
		{/key}
	{/each}
</div>

<style lang="scss">
	.svelte-grid-outer {
		display: grid;
	}
</style>
