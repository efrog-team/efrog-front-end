<script lang="ts">
    import { invalidateAll } from '$app/navigation';

    export let data;

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
    {#if data.problem.private}
    <button class="btn btn-outline-danger px-4" on:click={()=>action("make_public")}>Make public</button>
    <span class="text-for-btn btn disabled">Some text</span>
    {:else}
    <button class="btn btn-outline-danger px-4" on:click={()=>action("make_private")}>Make private</button>
    <span class="text-for-btn btn disabled">Some text</span>
    {/if}
</div>
<div class="mb-4">
    <button class="btn btn-outline-danger px-4" on:click={()=>action("delete")}>Delete</button>
    <span class="text-for-btn btn disabled">Some text</span>
</div>
{/if}
<style>
    .text-for-btn{
        border-color: transparent;
        color: var(--font-color)
    }
</style>