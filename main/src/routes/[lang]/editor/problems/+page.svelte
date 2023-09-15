<script>
    import ProblemFilter from "$lib/components/ProblemFilter.svelte";

    export let data;
    let filteredProblems = data.problems;
</script>
<div class="mb-4 mt-2">
    <h2 class="header">Manage my problems</h2>
</div>
<ProblemFilter bind:data={filteredProblems}/>
<div class="mt-3 mb-4">
    <div class="list-group">
    {#each filteredProblems as problem}     
        <li class="list-group-item list-group-item-action d-flex">
            <a href="/{data.lang}/problems/{problem.id}" class="col-1">{problem.id}</a>
            <a href="/{data.lang}/problems/{problem.id}" class="me-auto">{problem.name}</a>
            <span class="me-2">{problem.private ? "private" : "public"}</span>
            <a class="col-1 text-end nav-link" href="./problems/{problem.id}">edit</a>
        </li>
    {/each}
    </div>
</div>