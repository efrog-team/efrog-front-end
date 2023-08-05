<script lang="ts">
    import { invalidateAll } from '$app/navigation';
    import TeamsFilters from './TeamsFilters.svelte';

    export let data;

    let filtered = data.members;

    async function action(type: string){
        try {
            await fetch(`./${data.teamInfo.name}`, {
                method: 'PUT',
                body: JSON.stringify({ action: type }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } catch (err) {
            console.error(err);
        }
        invalidateAll();
    }
</script>
{#if data.needConfirmation}
<div class="alert d-flex align-items-stretch mt-2" role="alert">
    <span class="flex-grow-1 my-auto">Confirm that you are member of this team</span>
    <button class="btn btn-accent me-2" on:click={ () => { action("confirm") } }>Confirm</button>
    <button class="btn btn-secondary" on:click={ () => { action("decline") } }>Decline</button>
 </div>
{/if}
<div class="mb-3">
    <h2 class="header mb-3 {data.teamInfo.active ? '' : 'deactivated'}">
        {data.teamInfo.name}{data.teamInfo.active ? '' : ' (deactivated)'}
    </h2>
</div>
<div class="mb-4">
    <p>Owner: {data.teamInfo.owner_username}</p> 
</div>
{#if data.me}
<div class="mb-4">
    <a class="btn btn-accent" href="./{data.teamInfo.name}/edit">Edit team</a>
</div>
{/if}
<div class="mt-5 mb-2">
    <h4>Members</h4>
</div>
<TeamsFilters bind:data={filtered} />
<div class="mb-4">
    <div class="list-group">
    {#each filtered as member}     
        <span class="list-group-item list-group-item-action d-flex">
            <span class="flex-grow-1">
                <i class="me-2 bi bi-{member.confirmed ? 'check' : member.declined ? 'x' : 'question'}-circle"></i>
                <a href="/users/{member.member_username}"><span>{member.member_username}</span></a>
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

    .deactivated{
        color: var(--error-color)
    }
</style>