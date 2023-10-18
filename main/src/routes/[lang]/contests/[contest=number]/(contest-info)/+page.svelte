<script lang="ts">
    import { invalidateAll } from '$app/navigation';
    import { convertDate } from '$lib/features.js';

    export let data;

    async function action(type: string){
        type += data.contest.maximum_team_members_number == 1 ? "Individual":"Team";
        await fetch(`/${data.lang}/contests/${data.contest.id}`, {
            method: 'PUT',
            body: JSON.stringify({ action: type }),
        });
        invalidateAll();
    }
</script>
{#if data.needConfirmation}
<div class="alert d-flex align-items-stretch mt-2" role="alert">
    <span class="flex-grow-1 my-auto">confirm info</span>
    <button class="btn btn-accent me-2" on:click={ () => { action("confirm") } }>confirm</button>
    <button class="btn btn-secondary" on:click={ () => { action("decline") } }>decline</button>
 </div>
{/if}
<div class="mb-4">
    <h2>
        <span class="header">{data.contest.name} </span>
    </h2>
    {#if data.contest.description.trim()}
    <div class="mb-3">
        <em>{data.contest.description}</em>
    </div>
    {/if}
</div>
<div class="mb-5">
    <div class="mb-2">
        <h3>
            {#if data.contest.status == 'ongoing'}
            <i class="bi bi-play-circle text-accent"></i> Started
            {:else if data.contest.status == 'ended'}
            <i class="bi bi-check-circle text-yellow"></i> Ended
            {:else}
            <i class="bi bi-clock text-yellow"></i> Scheduled
            {/if}
        </h3>
    </div>
    <div >
        <div class="mb-1">Start date:&nbsp; {convertDate(data.contest.start_time)}<br></div>
        <div>End date:&nbsp;&nbsp;&nbsp; {convertDate(data.contest.end_time)}</div>
    </div>
</div>
{#if data.contest.status != 'unstarted'}
<div class="mb-4">
    <h4>Problems</h4>
    <div class="mt-3 mb-4">
        <div class="list-group">
        {#each data.problems as problem, i}     
            <li class="list-group-item list-group-item-action d-flex">
                <span class="me-3">{String.fromCharCode('A'.charCodeAt(0) + i)}</span>
                <a href="/{data.lang}/contests/{data.contest.id}/problems/{problem.id}" class="me-auto">{problem.name}</a>
            </li>
        {/each}
        </div>
    </div>
</div>
{/if}
<style>
    .alert{
        --bs-alert-bg: var(--color3)
    }
</style>