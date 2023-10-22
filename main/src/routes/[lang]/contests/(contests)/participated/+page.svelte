<script lang="ts">
    import ContestsFilter from "./ContestsFilter.svelte";
    import locs from '$lib/localisation.json';

    export let data;

    let loc = locs[data.lang as keyof typeof locs].contests.participated;
    let filteredContests = data.contests;
</script>
<div class="mb-4 mt-2">
    <h2 class="header">{loc.header}</h2>
</div>
<ContestsFilter lang={data.lang} bind:data={filteredContests}/>
<div class="mt-3 mb-4">
    <div class="list-group">
    {#each filteredContests as contest, i}     
        <li class="list-group-item list-group-item-action d-flex">
            <span class="me-2">{i + 1}</span>
            {#if contest.private}
            <span class="me-2"><i class="bi bi-lock-fill text-yellow"></i></span>
            {/if}
            <a href="/{data.lang}/contests/{contest.id}" class="me-auto">{contest.name}</a>
            <span>
                {#if !contest.author_confirmed }
                <span class="text-yellow">{loc.unapproved.toLowerCase()}</span>
                {:else if !contest.participant_confirmed }
                <span class="text-yellow">{loc.unconfirmed.toLowerCase()}</span>
                {:else}
                <span class="text-accent">{loc.registered.toLowerCase()}</span>
                {/if}
            </span>
        </li>
    {/each}
    </div>
</div> 