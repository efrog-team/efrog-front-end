<script lang="ts">
	import ContestsFilter from "./ContestsFilter.svelte";
	import locs from "$lib/localisation.json";
	import { contestStatusIcon } from "$lib/icons";

	export let data;

	let loc = locs[data.lang as keyof typeof locs].contests.participated;
	let filteredContests = data.contests;
</script>
<svelte:head>
	<title>{loc.header}</title>
</svelte:head>
<div class="mb-4 mt-2">
	<h2 class="header">{loc.header}</h2>
</div>
<ContestsFilter lang={data.lang} bind:data={filteredContests}/>
<div class="mt-3 mb-4">
	<ul class="list-group">
		{#each filteredContests as contest, i}     
			<li class="list-group-item list-group-item-action d-flex">
				<span class="number me-3">{i + 1}</span>
				<i class="bi {contestStatusIcon[contest.status]} me-3"></i>
				<a href="/{data.lang}/contests/{contest.id}" class="me-auto">
					{contest.name}
					{#if contest.private}
						<span class="me-2"><i class="bi bi-lock-fill text-yellow"></i></span>
					{/if}
				</a>
				<span class="text-nowrap">
					{#if !contest.author_confirmed }
						<span class="text-yellow">{loc.unapproved}</span>
					{:else if !contest.participant_confirmed }
						<span class="text-yellow">{loc.unconfirmed}</span>
					{:else}
						<span class="text-accent">{loc.registered}</span>
					{/if}
				</span>
			</li>
		{/each}
	</ul>
</div> 