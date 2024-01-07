<script lang="ts">
    import locs from "$lib/localisation.json";
    
    export let data;

    let loc = locs[data.lang as keyof typeof locs].editor.limitations;
</script>
<div class="mb-4 mt-2">
    <h2 class="header">{loc.header}</h2>
</div>
<div class="mb-4">
    <p>{loc.overview}</p>
    <p>
        <span class="me-2 ">{loc.problems}: </span> <span class="text-accent">{data.author.problems_quota}</span> <br>
        <span class="me-2">{loc.test_cases}: </span> <span class="text-accent">{data.author.test_cases_quota}</span> <br>
        <span class="me-2 ">{loc.contests}: </span> <span class="text-accent">{data.author.competitions_quota}</span>
    </p>
    <p>
        {loc.modify} <a class="link nav-link" href="/{data.lang}/question">{loc.ask}</a>.
    </p>
</div>
<style>
    .link{
        display: inline-block;
        color: var(--accent-color)
    }
    .link:hover{
        text-decoration: underline;
    }
</style>
