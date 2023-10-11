<script lang="ts">
    import { invalidateAll } from '$app/navigation';
    import locs from '$lib/localisation.json';

    export let data;
    //let loc = locs[data.lang as keyof typeof locs].editor.problems.problem.danger_zone;

    async function action(type: string){
        await fetch(`./danger-zone`, {
            method: 'PUT',
            body: JSON.stringify({ action: type }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        invalidateAll();
    }
</script>
{#if data.editable}
<div class="mb-3 mt-3">
    {#if data.competition.private}
    <button class="btn btn-outline-danger px-4" on:click={()=>action("make_public")}>Make public</button>
    <span class="text-for-btn btn disabled">some info</span>
    {:else}
    <button class="btn btn-outline-danger px-4" on:click={()=>action("make_private")}>Make private</button>
    <span class="text-for-btn btn disabled">some info</span>
    {/if}
</div>
<div class="mb-4">
    <button class="btn btn-outline-danger px-4" on:click={()=>action("delete")}>delete</button>
    <span class="text-for-btn btn disabled">some info</span>
</div>
{/if}
<style>
    .text-for-btn{
        border-color: transparent;
        color: var(--font-color)
    }
</style>