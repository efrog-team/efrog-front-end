<script lang="ts">
    import Pagination from '$lib/components/Pagination.svelte';
    import { itemsOnPage } from '$lib/config.js';
    import locs from '$lib/localisation.json';
    
    export let data;
    let loc = locs[data.lang as keyof typeof locs].contests.main
</script>
<div class="mb-4 mt-2">
    <h2 class="header">{loc.header}</h2>
</div>
<div class="mt-3 mb-4">
    <div class="list-group">
    {#each data.contests as contest, i}     
        <li class="list-group-item list-group-item-action d-flex">
            <a href="/{data.lang}/contests/{contest.id}" class="me-4">{i + 1}</a>
            <a href="/{data.lang}/contests/{contest.id}" class="me-auto">{contest.name}</a>
        </li>
    {/each}
    </div>
</div>
<div class="mb-4">
    <Pagination lastPage={data.contests.length<itemsOnPage} currentPage={data.page}/>
</div>