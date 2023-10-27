<script lang="ts">
    import { page } from "$app/stores";
    import ProblemFilter from "$lib/components/PrivacyFilter.svelte";
    import AdditionModal from "$lib/components/AdditionModal.svelte";
    import locs from '$lib/localisation.json';

    export let data;
    export let form;
    let filteredProblems = data.problems;

    let loc = locs[data.lang as keyof typeof locs].editor.problems;
</script>
<div class="mb-4 mt-2">
    <h2 class="header">{loc.header}</h2>
</div>
<div class="mb-3">
    <a class="btn btn-accent me-3" href="{$page.url.pathname}/new">{loc.create_problem} <i class="bi bi-plus"></i></a>
    <button class="btn btn-accent {form?.error ? 'disabled' : ''}" data-bs-toggle="modal" data-bs-target="#fromHubModal">{loc.from_hub.header} <i class="bi bi-node-plus"></i></button>
</div>
<ProblemFilter lang={data.lang} bind:data={filteredProblems}/>
<div class="mt-3 mb-4">
    <div class="list-group">
    {#each filteredProblems as problem}     
        <li class="list-group-item list-group-item-action d-flex">
            <a href="/{data.lang}/problems/{problem.id}" class="me-4 col-auto">{problem.id}</a>
            <a href="/{data.lang}/problems/{problem.id}" class="me-auto">
                {#if problem.private}<i class="bi bi-eye-slash-fill me-1"></i>{/if}
                {problem.name} 
            </a>
            <a class="col-auto text-end nav-link" href="./problems/{problem.id}">{loc.edit_problem} <i class="bi bi-pencil"></i></a>
        </li>
    {/each}
    </div>
</div>
<AdditionModal lang={data.lang} bind:form={form} modalId="fromHubModal" type="number" inputName="problemId" 
    inputLable={loc.from_hub.problem_id} header={loc.from_hub.header} action="fromHub"/>