<script lang="ts">
    import { onMount } from 'svelte';
    import Modal from './Modal.svelte';
    import { invalidateAll } from '$app/navigation';
    import TeamsFilters from '../TeamsFilters.svelte';

    export let data;
    export let form;

    let newName = form?.data?.teamName || data.teamInfo.name;
    let filtered = data.members;

    onMount(()=>{
        document.getElementById('memberModal')?.addEventListener('hide.bs.modal', () => {
            form = null;
        });
        let nameModal = new window.bootstrap.Modal('#memberModal');
        if(form?.error && form?.data.username) nameModal.show();
    });

    async function action(type: string){
        try {
            await fetch(`./edit`, {
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

<div class="mb-4">
    <h2 class="header">Edit team</h2>
</div>
<div class="mb-4">
    <form action="?/rename" method="post">
        <label for="exampleFormControlInput1" class="form-label">Team name</label>
        <div class="d-flex mb-3">
            <input type="text" class="form-control me-1 me-sm-3" id="nameInput" name="teamName" bind:value={newName}>
            <button class="px-sm-4 px-lg-5 btn {newName == data.teamInfo.name ? 'disabled btn-secondary' : 'btn-accent'}">Save</button>
        </div>
        {#if form?.error && form?.data.teamName}
            <div class="form-error form-text mb-3">{form.error}</div>
        {/if}
    </form>
</div>
<div class="mt-5 mb-3">
    <h4>Members</h4>
</div>
<div class="mb-4">
    <button class="btn btn-accent {form?.error ? 'disabled' : ''}" data-bs-toggle="modal" data-bs-target="#memberModal"><i class="bi-plus"></i>Add member</button>
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
            <span class="me-3">{member.coach ? "coach" : "contestant"}</span>
            <button class="nav-link" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi-three-dots-vertical"></i>
            </button>
            <form method="post">
                <input type="hidden" name="username" value={member.member_username}>
                <ul class="dropdown-menu dropdown-menu-end dropdown-menu-dark">
                    <li><button class="dropdown-item {member.member_username == data.teamInfo.owner_username ? 'disabled' : ''}" type="submit" formaction="?/delete">Delete</button></li>
                    <li>
                        {#if member.coach}
                        <button class="dropdown-item" type="submit" formaction="?/contestant">Make contestant</button>
                        {:else}
                        <button class="dropdown-item" type="submit" formaction="?/coach">Make coach</button>
                        {/if}
                    </li>
                </ul>
            </form>
        </span>
    {/each}
    </div>
</div>
<div class="mt-5 mb-3">
    <h4>Danger zone</h4>
</div>
<div class="mb-3">
    {#if data.teamInfo.active}
    <button class="btn btn-outline-danger px-4" on:click={()=>action("deactivate")}>Deactivate</button>
    <span class="text-for-btn btn disabled">Some text</span>
    {:else}
    <button class="btn btn-outline-danger px-4" on:click={()=>action("activate")}>Activate</button>
    <span class="text-for-btn btn disabled">Some text</span>
    {/if}
</div>

{#if data.deletable}
<div class="mb-4">
    <button class="btn btn-outline-danger px-4" on:click={()=>action("delete")}>Delete</button>
    <span class="text-for-btn btn disabled">Some text</span>
</div>
{/if}
<Modal form={form}></Modal>
<style>
    .text-for-btn{
        border-color: transparent;
        color: var(--font-color)
    }
</style>