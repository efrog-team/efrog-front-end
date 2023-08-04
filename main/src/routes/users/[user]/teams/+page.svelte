<script lang="ts">
    import { onMount } from 'svelte';
    import Modal from "./Modal.svelte";

    export let data;
    export let form;
    let filtered = data.teams;

    enum Owners { me, notMe, all };
    enum Statuses { active, notActive, all };

    let cStatus = Statuses.active;
    let cOwner = Owners.all;

    $: {
        filtered = data.teams.filter( (team) => {
            return cStatus == Statuses.all || (cStatus == Statuses.active) == team.active 
        });

        filtered = filtered.filter( (team) => {
            return cOwner == Owners.all || (cOwner == Owners.me) == (team.owner_username == data.username);
        });
    }

    onMount(()=>{
        document.getElementById('nameModal')?.addEventListener('hide.bs.modal', () => {
            form = null;
        });
        let nameModal = new window.bootstrap.Modal('#nameModal');
        if(form?.error) nameModal.show();
    });
</script>
<div class="mb-4 mt-2">
    <h2 class="header">{data.username}: teams</h2>
</div>
{#if data.me}
<div class="my-4">
    <button class="btn btn-accent" data-bs-toggle="modal" data-bs-target="#nameModal"><i class="bi-plus"></i> Create team</button>
</div>
{/if}
<div class="mb-2">
    <nav class="nav">
        <li class="nav-item dropdown">
            <button class="nav-link dropdown-toggle filter" data-bs-toggle="dropdown" aria-expanded="false">Status</button>
            <ul class="dropdown-menu dropdown-menu-dark">
                <li><button class="dropdown-item {cStatus == Statuses.all ? "active": ""}" on:click={ () => cStatus = Statuses.all }>All</button></li>
                <li><button class="dropdown-item {cStatus == Statuses.active ? "active": ""}" on:click={ () => cStatus = Statuses.active }>Active</button></li>
                <li><button class="dropdown-item {cStatus == Statuses.notActive ? "active": ""}" on:click={ () => cStatus = Statuses.notActive }>Not active</button></li>
            </ul>
        </li>
        <li class="nav-item dropdown">
            <button class="nav-link dropdown-toggle filter" data-bs-toggle="dropdown" aria-expanded="false">Owner</button>
            <ul class="dropdown-menu dropdown-menu-dark">
                <li><button class="dropdown-item {cOwner == Owners.all ? "active": ""}" on:click={ () => cOwner = Owners.all }>All</button></li>
                <li><button class="dropdown-item {cOwner == Owners.me ? "active": ""}" on:click={ () => cOwner = Owners.me }>Me</button></li>
                <li><button class="dropdown-item {cOwner == Owners.notMe ? "active": ""}" on:click={ () => cOwner = Owners.notMe }>Not me</button></li>
            </ul>
        </li>
    </nav>
</div>
<div class="mt-3 mb-4">
    <div class="list-group">
    {#each filtered as team}     
        <a href = "/teams/{team.name}" class="list-group-item list-group-item-action d-flex">
            <span class="me-auto">
                {#if team.active}
                    <span>{team.name}</span>
                {:else} 
                    <s>{team.name}</s>
                {/if}
            </span>
            {#if team.owner_username == data.username}
                <span><i class="bi-person-circle"></i></span>
            {/if}
        </a>
    {/each}
    </div>
</div>
<Modal form={form}></Modal>
<style>
    .filter{
        padding-left: 0;
    }
</style>