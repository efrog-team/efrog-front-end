<script lang="ts">
	import Submissions from "$lib/components/Submissions.svelte";
	import locs from "$lib/localisation.json";

	export let data;
	let loc = locs[data.lang as keyof typeof locs].user.submissions;
</script>
<svelte:head>
	<title>{data.username} | {loc.submissions}</title>
</svelte:head>
<div class="mb-4 mt-2">
	<h2 class="header">{data.username}: {loc.submissions}</h2>
</div>
<Submissions lang={data.lang} submissions={data.submissions} />