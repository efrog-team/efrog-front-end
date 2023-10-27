<script lang="ts">
    import { invalidateAll } from '$app/navigation';
    import TeamsFilters from './TeamsFilters.svelte';
    import locs from '$lib/localisation.json';

    export let data;

    let loc = locs[data.lang as keyof typeof locs].teams;
    
    let filtered = data.members;

    async function action(type: string){
        await fetch(`./${data.teamInfo.name}`, {
            method: 'PUT',
            body: JSON.stringify({ action: type }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        invalidateAll();
    }
</script>
{#if data.needConfirmation}
<div class="alert d-flex align-items-stretch mt-2" role="alert">
    <span class="flex-grow-1 my-auto">{loc.confirm.info}</span>
    <button class="btn btn-accent me-2" on:click={ () => { action("confirm") } }>{loc.confirm.confirm}</button>
    <button class="btn btn-secondary" on:click={ () => { action("decline") } }>{loc.confirm.decline}</button>
 </div>
{/if}
<div class="mb-3">
    <h2 class="header mb-3">
        {data.teamInfo.name}{data.teamInfo.active ? '' : ` (${loc.deactivated})`}
    </h2>
</div>
{#if data.me}
<div class="mb-4 mt-4">
    <a class="btn btn-accent" href="./{data.teamInfo.name}/edit">{loc.edit_team} <i class="bi bi-pencil"></i></a>
</div>
{/if}
<div class="mt-5 mb-2">
    <h4>{loc.members}</h4>
</div>
<TeamsFilters lang={data.lang} bind:data={filtered} />
<div class="mb-4">
    <div class="list-group">
    {#each filtered as member}     
        <span class="list-group-item list-group-item-action d-flex">
            <span class="flex-grow-1">
                {#if data.teamInfo.owner_user_username == member.member_username}
                <span><i class="me-2 bi-person-circle"></i></span>
                {:else}
                <i class="me-2 bi bi-{member.confirmed ? 'check' : member.declined ? 'x' : 'question'}-circle"></i>
                {/if}
                <a href="/{data.lang}/users/{member.member_username}"><span>{member.member_username}</span></a>
            </span>
            <span>{member.coach ? "coach" : "contestant"}</span>
        </span>
    {/each}
    </div>
</div>

<style>
    .alert{
        --bs-alert-bg: var(--color3)
    }
</style>