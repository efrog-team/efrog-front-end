<script>
    import { page } from "$app/stores";
    import ProblemFilter from "$lib/components/ProblemFilter.svelte";
    import { onMount } from "svelte";
    import FromHubModal from "./FromHubModal.svelte";

    export let data;
    export let form;
    let filteredProblems = data.problems;

    onMount(()=>{
        document.getElementById('fromHubModal')?.addEventListener('hide.bs.modal', () => {
            form = null;
        });
        let nameModal = new window.bootstrap.Modal('#fromHubModal');
        if(form?.error) nameModal.show();
    });
</script>
<div class="mb-4 mt-2">
    <h2 class="header">Manage my problems</h2>
</div>
<div class="mb-3">
    <a class="btn btn-accent me-3" href="{$page.url.pathname}/new">Create problem <i class="bi bi-plus"></i></a>
    <button class="btn btn-accent {form?.error ? 'disabled' : ''}" data-bs-toggle="modal" data-bs-target="#fromHubModal">Add from Hub <i class="bi bi-node-plus"></i></button>
</div>
<ProblemFilter bind:data={filteredProblems}/>
<div class="mt-3 mb-4">
    <div class="list-group">
    {#each filteredProblems as problem}     
        <li class="list-group-item list-group-item-action d-flex">
            <a href="/problems/{problem.id}" class="col-1">{problem.id}</a>
            <a href="/problems/{problem.id}" class="me-auto">{problem.name}</a>
            <span class="me-2">{problem.private ? "private" : "public"}</span>
            <a class="col-1 text-end nav-link" href="./problems/{problem.id}">edit</a>
        </li>
    {/each}
    </div>
</div>
<FromHubModal form={form}/>