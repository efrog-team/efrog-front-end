<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
	import Pagination from "$lib/components/Pagination.svelte";
	import { itemsOnPage } from "$lib/config.js";
	import { contestStatusIcon } from "$lib/icons.js";
	import locs from "$lib/localisation.json";
    
	export let data;
	let loc = locs[data.lang as keyof typeof locs].contests.main;
	let approved = $page.url.searchParams.get('unapproved') !== 'true';
</script>
<div class="mb-4 mt-2">
	<h2 class="header">{loc.header}</h2>
</div>
<div class="mb-2">
	<input id="approved" class="form-check-input" type="checkbox" on:change={()=>goto(`?${approved?'unapproved=true':''}`, {replaceState: true})} bind:checked={approved}>
	<label class="form-check-label" for="approved">{loc.approved}</label>
</div>
<div class="mb-4">
	<div class="list-group">
		{#each data.contests as contest, i}     
			<li class="list-group-item list-group-item-action d-flex">
				<a href="/{data.lang}/contests/{contest.id}">
					<span class="me-3">{i + 1}</span>
					<i class="bi {contestStatusIcon[contest.status]} me-3"></i>
					<span class="me-auto">{contest.name}</span>
				</a>
			</li>
		{/each}
	</div>
</div>
<div class="mb-4">
	<Pagination lastPage={data.contests.length<itemsOnPage} currentPage={data.page}/>
</div>