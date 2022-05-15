<script lang="ts">
	const { default: Grid } = require('$lib/Grid.svelte');
    const items = [];
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<Grid {items} />
