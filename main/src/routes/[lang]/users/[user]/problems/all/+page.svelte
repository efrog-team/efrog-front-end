<script lang="ts">
    import ProblemFilter from "$lib/components/PrivacyFilter.svelte";
    import locs from '$lib/localisation.json'

    export let data;

    let loc = locs[data.lang as keyof typeof locs].user.problems;
    let filteredProblems = data.problems;
</script>
<div class="mb-4 mt-2">
    <h2 class="header">{loc.my_problems}</h2>
</div>
<div class="mb-3">
    <a class="btn btn-accent" href="/{data.lang}/editor/problems">{loc.manage} <i class="bi bi-arrow-right"></i></a>
</div>
<ProblemFilter lang={data.lang} bind:data={filteredProblems}/>
<div class="mt-3 mb-4">
    <div class="list-group">
    {#each filteredProblems as problem}     
        <li class="list-group-item list-group-item-action d-flex">
            <a href="/{data.lang}/problems/{problem.id}" class="col-1">{problem.id}</a>
            <a href="/{data.lang}/problems/{problem.id}" class="me-auto">{problem.name}</a>
            <span class="me-2">{problem.private ? "private" : "public"}</span>
        </li>
    {/each}
    </div>
</div>