<script lang='ts'>
	import locs from "$lib/localisation.json";

	export let data;
	let loc = locs[data.lang as keyof typeof locs].editor.main;
</script>
<svelte:head>
	<title>{loc.header}</title>
</svelte:head>
<h2 class="header">{loc.header}</h2>
<p>{loc.description}</p>