<script lang="ts">
    import ProblemEdit from "../ProblemEdit.svelte";

    export let data;
    export let form: any;
</script>

<div class="mb-3">
    <h2 class="header">Edit problem {data.id}</h2>
</div>
<div class="mt-4 mb-4">
    <a class="btn btn-accent" href="/test-cases">Edit Test Cases <i class="bi bi-arrow-right"></i></a>
</div>
<ProblemEdit newProblem={false} info={form || {data: data.problem}}/>
{#if data.editable}
<div class="mt-5 mb-3">
    <h4>Danger zone</h4>
</div>
<div class="mb-3">
    {#if data.problem.private}
    <button class="btn btn-outline-danger px-4" on:click={Number}>Make public</button>
    <span class="text-for-btn btn disabled">Some text</span>
    {:else}
    <button class="btn btn-outline-danger px-4" on:click={Number}>Make private</button>
    <span class="text-for-btn btn disabled">Some text</span>
    {/if}
</div>
<div class="mb-4">
    <button class="btn btn-outline-danger px-4" on:click={Number}>Delete</button>
    <span class="text-for-btn btn disabled">Some text</span>
</div>
{/if}

<style>
    .text-for-btn{
        border-color: transparent;
        color: var(--font-color)
    }
</style>