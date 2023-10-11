<script lang="ts">
    import AdditionModal from '$lib/components/AdditionModal.svelte';
    export let data;
    export let form;
</script>
<div class="mb-4 mt-3">
    <button class="btn btn-accent {form?.error ? 'disabled' : ''}" data-bs-toggle="modal" data-bs-target="#addition-modal"><i class="bi-plus"></i>Add participant</button>
</div>
<div class="mb-4">
    <div class="list-group">
        {#each data.participants as participant}
        <li class="list-group-item list-group-item-action d-flex">
            <span class="me-2"><i class="me-2 bi bi-{participant.participant_confirmed ? 'check' : participant.participant_confirmed ? 'x' : 'question'}-circle"></i></span>
            <a class="me-auto" href="/{data.lang}/{participant.individual?"users":"teams"}/{participant.username_or_team_name}">{participant.username_or_team_name}</a>
            <span class="me-2">{participant.author_confirmed?"approved":"not approved"}</span>
            <button class="nav-link" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi-three-dots-vertical"></i>
            </button>
            <form method="post">
                <input type="hidden" name="name" value={participant.username_or_team_name}>
                <input type="hidden" name="individual" value={participant.individual||null}>
                <ul class="dropdown-menu dropdown-menu-end dropdown-menu-dark">
                    {#if !participant.author_confirmed}
                    <li> <button class="dropdown-item" type="submit" formaction="?/confirm">Confirm</button></li>
                    {/if}
                    <li><button class="dropdown-item" type="submit" formaction="?/delete">Delete</button></li>
                </ul>
            </form>
        </li>
        {/each}
    </div>
</div>
<!--text-->
<AdditionModal bind:form={form} lang={data.lang} inputName="name" type="text" header="Add participant" inputLable="Username"/>