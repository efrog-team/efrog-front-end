<script lang="ts">
    import { page } from '$app/stores';
    import locs from '$lib/localisation.json';

    export let data;

    let loc = locs[data.lang as keyof typeof locs].editor.problems.problem.layout;

    let baseName: string, pageName: string;
    page.subscribe((record)=>{
        baseName = `/${record.params.lang}/editor/problems/${record.params.problemId}`
        pageName = record.url.pathname.replace(baseName, "");
    });
</script>

<div class="mb-2">
    <h2 class="header">{data.editable ? `${data.problem.name}: edit` : `Problem ${data.problem.name} (not editable)`}</h2>
</div>
<ul class="nav mb-2">
    <li class="nav-item">   
        <a class="nav-link {pageName == '' ? 'active':''}" href={baseName}>{loc.statement}</a>
    </li>
    <li class="nav-item">
        <a class="nav-link {pageName == '/test-cases' ? 'active':''}" href="{baseName}/test-cases">{loc.test_cases}</a>
    </li>
    {#if data.editable}
    <li class="nav-item">
        <a class="nav-link {pageName == '/danger-zone' ? 'active':''}" href="{baseName}/danger-zone">{loc.danger_zone}</a>
    </li>
    {/if}
</ul>
<slot />

<style>
    .nav .nav-link{
        padding-left: 0;
    }

    .active{
        color: var(--accent-color);
    }
</style>