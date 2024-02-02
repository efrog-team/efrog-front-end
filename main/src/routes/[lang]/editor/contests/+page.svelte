<script lang="ts">
	import { page } from "$app/stores";
	import PrivacyFilter from "$lib/components/PrivacyFilter.svelte";
	import locs from "$lib/localisation.json";

	export let data;
	let filteredContests = data.contests;

	let loc = locs[data.lang as keyof typeof locs].editor.contests;
</script>
<svelte:head>
	<title>{loc.header}</title>
</svelte:head>
<div class="mb-4 mt-2">
	<h2 class="header">{loc.header}</h2>
</div>
<div class="mb-3">
	<a class="btn btn-accent me-3" href="{$page.url.pathname}/new">{loc.create_contest} <i class="bi bi-plus"></i></a>
</div>
<PrivacyFilter lang={data.lang} bind:data={filteredContests}/>
<div class="mt-3 mb-4">
	<div class="list-group">
		{#each filteredContests as contest}     
			<li class="list-group-item list-group-item-action d-flex">
				<a href="/{data.lang}/contests/{contest.id}" class="number col-auto me-3">{contest.id}</a>
				<a href="/{data.lang}/contests/{contest.id}" class="me-auto">
					{#if contest.private}<i class="bi bi-lock me-1 text-yellow"></i>{/if}
					{contest.name}
				</a>
				<a class="col-auto text-end nav-link" href="./contests/{contest.id}">{loc.see_contest} <i class="bi bi-arrow-right"></i></a>
			</li>
		{/each}
	</div>
</div>