<script lang="ts">
    import ContestsFilter from "./ContestsFilter.svelte";

    export let data;
    //import locs from '$lib/localisation.json';

    //let loc = locs[data.lang as keyof typeof locs].problems;
    let filteredContests = data.contests;
</script>
<div class="mb-4 mt-2">
    <h2 class="header">Participated contests</h2>
</div>
<ContestsFilter bind:data={filteredContests}/>
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
                <span class="text-yellow">need authors approval</span>
                {:else if !contest.participant_confirmed }
                <span class="text-yellow">need confirmation</span>
                {:else}
                <span class="text-accent">registered</span>
                {/if}
            </span>
        </li>
    {/each}
    </div>
</div> 