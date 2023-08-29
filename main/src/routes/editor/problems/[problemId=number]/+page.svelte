<script lang="ts">
    import { invalidateAll } from "$app/navigation";
    import { page } from "$app/stores";
    import ProblemEdit from "../ProblemEdit.svelte";

    export let data;
    export let form: any;

    async function action(type: string){
        await fetch(`./${data.id}`, {
            method: 'PUT',
            body: JSON.stringify({ action: type }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        invalidateAll();
    }
</script>

<div class="mb-4">
    <h2 class="header">{data.editable ? `Edit problem ${data.id}` : `Problem ${data.id} (not editable)`}</h2>
</div>
<div class="pt-3"></div>
<div class="mb-4">
    <a class="btn btn-accent" href="./{$page.params.problemId}/test-cases">Manage Test Cases <i class="bi bi-arrow-right"></i></a>
</div>
<ProblemEdit editable={data.editable} newProblem={false} info={form || {data: data.problem}}/>
{#if data.editable}
<div class="mt-5 mb-3">
    <h4>Danger zone</h4>
</div>
<div class="mb-3">
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