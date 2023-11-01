<script lang="ts">
	export let data;
	import Pagination from "$lib/components/Pagination.svelte";
	import { itemsOnPage } from "$lib/config.js";
	import locs from "$lib/localisation.json";

	let loc = locs[data.lang as keyof typeof locs].problems;
</script>
<div class="mb-4 mt-2">
	<h2 class="header">{loc.header}</h2>
</div>
<div class="mt-3 mb-4">
	<div class="list-group">
		{#each data.problems as problem, i}     
			<li class="list-group-item list-group-item-action d-flex">
				<a href="/{data.lang}/problems/{problem.id}">
					<span class="me-4">{i + 1}</span>
					<span class="me-auto">{problem.name}</span>
				</a>
			</li>
		{/each}
	</div>
</div>
<div class="mb-4">
	<Pagination lastPage={data.problems.length<itemsOnPage} currentPage={data.page}/>
</div>