<script lang="ts">
    import { page } from "$app/stores";
    import PrivacyFilter from "$lib/components/PrivacyFilter.svelte";
    //import locs from '$lib/localisation.json';

    export let data;
    let filteredContests = data.contests;

    //let loc = locs[data.lang as keyof typeof locs].editor.problems;
</script>
<div class="mb-4 mt-2">
    <h2 class="header">Manage my contests</h2>
</div>
<div class="mb-3">
    <a class="btn btn-accent me-3" href="{$page.url.pathname}/new">Create contest <i class="bi bi-plus"></i></a>
</div>
<PrivacyFilter lang={data.lang} bind:data={filteredContests}/>
<div class="mt-3 mb-4">
    <div class="list-group">
    {#each filteredContests as contest}     
        <li class="list-group-item list-group-item-action d-flex">
            <a href="/{data.lang}/contests/{contest.id}" class="col-1">{contest.id}</a>
            <a href="/{data.lang}/contests/{contest.id}" class="me-auto">{contest.name}</a>
            <!--text-->
            <span class="me-3">{contest.private ? "private" : "public"}</span>
            <a class="col-auto text-end nav-link" href="./contests/{contest.id}">edit</a>
        </li>
    {/each}
    </div>
</div>