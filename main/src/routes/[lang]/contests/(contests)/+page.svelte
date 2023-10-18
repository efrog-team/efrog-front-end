<script lang="ts">
    export let data;
    import Pagination from '$lib/components/Pagination.svelte';
    //import locs from '$lib/localisation.json';

    //let loc = locs[data.lang as keyof typeof locs].problems;
</script>
<div class="mb-4 mt-2">
    <h2 class="header">Contests</h2>
</div>
<div class="mt-3 mb-4">
    <div class="list-group">
    {#each data.contests as contest, i}     
        <li class="list-group-item list-group-item-action d-flex">
            <a href="/{data.lang}/contest/{contest.id}" class="col-1">{i + 1}</a>
            <a href="/{data.lang}/contest/{contest.id}" class="me-auto">{contest.name}</a>
        </li>
    {/each}
    </div>
</div>
<div class="mb-4">
    <Pagination maxPage={data.last} currentPage={data.page}/>
</div>