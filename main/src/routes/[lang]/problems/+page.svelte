<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import Pagination from "$lib/components/Pagination.svelte";
	import { itemsOnPage } from "$lib/config.js";
	import locs from "$lib/localisation.json";
	
	export let data;

	let loc = locs[data.lang as keyof typeof locs].problems;
	let approved = $page.url.searchParams.get("unapproved") !== "true";
</script>
<svelte:head>
	<title>{loc.header}</title>
</svelte:head>
<div class="mb-3 mt-2">
	<h2 class="header">{loc.header}</h2>
</div>
<div class="mb-2">
	<input id="approved" class="form-check-input" type="checkbox" on:change={()=>goto(`?page=${data.page}${approved?"&unapproved=true":""}`, {replaceState: true})} bind:checked={approved}>
	<label class="form-check-label" for="approved">{loc.approved}</label>
</div>
<div class="mb-4">
	<ul class="list-group">
		{#each data.problems as problem, i}     
			<li class="list-group-item list-group-item-action d-flex">
				<span class="me-3 number">{i + 1}</span>
				<a href="/{data.lang}/problems/{problem.id}">
					<span class="me-auto">{problem.name}</span>
					{#if problem.solved}
						<i class="bi bi-check-circle-fill text-success ms-2"></i>
					{/if}
				</a>
			</li>
		{/each}
	</ul>
</div>
<div class="mb-4">
	<Pagination lastPage={data.problems.length<itemsOnPage} currentPage={data.page}/>
</div>