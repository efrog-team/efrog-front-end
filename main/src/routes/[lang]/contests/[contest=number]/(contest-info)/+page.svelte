<script lang="ts">
    import locs from '$lib/localisation.json'
    import { invalidateAll } from '$app/navigation';
    import { convertDate } from '$lib/features.js';
    import RegisterModal from './RegisterModal.svelte';

    export let data;
    export let form;

    let loc = locs[data.lang as keyof typeof locs].contests.contest.main;

    async function action(type: string){
        if(!data.userInfo) return;
        type += data.userInfo.individual ? "Individual":"Team";
        await fetch(`/${data.lang}/contests/${data.contest.id}`, {
            method: 'PUT',
            body: JSON.stringify({ action: type, name: data.userInfo.username_or_team_name }),
        });
        invalidateAll();
    }
</script>
{#if data.userInfo && !data.userInfo.participant_confirmed}
<div class="alert d-flex align-items-stretch mt-2" role="alert">
    <span class="flex-grow-1 my-auto">{loc.confirm.info}</span>
    <button class="btn btn-accent me-2" on:click={ () => { action("confirm") } }>{loc.confirm.confirm}</button>
    <button class="btn btn-secondary" on:click={ () => { action("decline") } }>{loc.confirm.decline}</button>
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
{#if !data.userInfo && data.username}
<div class="mb-4 mt-2">
    {#if data.contest.maximum_team_members_number == 1}
    <form method="post" action="?/register">
        <input type="hidden" name="type" value="individual">
        <button type="submit" class="btn btn-accent">{loc.reg_modal.register}</button>
    </form>
    {:else}
    <button type="submit" class="btn btn-accent" data-bs-toggle="modal" data-bs-target="#reg-modal">{loc.reg_modal.register}</button>
    <RegisterModal lang={data.lang} form={form} teams={data.userTeams}/>
    {/if}
</div>
{/if}
<div class="mb-5">
    <div class="mb-2">
        <h3>
            {#if data.contest.status == 'ongoing'}
            <i class="bi bi-play-circle text-accent"></i> {loc.ongoing}
            {:else if data.contest.status == 'ended'}
            <i class="bi bi-check-circle text-yellow"></i> {loc.ended}
            {:else}
            <i class="bi bi-clock text-yellow"></i> {loc.unstarted}
            {/if}
        </h3>
    </div>
    <div >
        <div>{convertDate(data.contest.start_time)} — {convertDate(data.contest.end_time)}</div>
    </div>
</div>
{#if data.contest.status != 'unstarted'}
<div class="mb-4">
    <h4>{loc.problems}</h4>
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