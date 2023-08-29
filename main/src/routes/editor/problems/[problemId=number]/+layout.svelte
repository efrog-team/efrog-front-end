<script lang="ts">
    import { page } from '$app/stores';

    export let data;

    let baseName: string, pageName: string;
    page.subscribe((record)=>{
        baseName = `/editor/problems/${record.params.problemId}`
        pageName = record.url.pathname.replace(baseName, "");
    });
</script>

<div class="mb-2">
    <h2 class="header">{data.editable ? `${data.problem.name}: edit` : `Problem ${data.problem.name} (not editable)`}</h2>
</div>
<ul class="nav mb-2">
    <li class="nav-item">   
        <a class="nav-link {pageName == '' ? 'active':''}" href={baseName}>Statement</a>
    </li>
    <li class="nav-item">
        <a class="nav-link {pageName == '/test-cases' ? 'active':''}" href="{baseName}/test-cases">Test Cases</a>
    </li>
    {#if data.editable}
    <li class="nav-item">
        <a class="nav-link {pageName == '/danger-zone' ? 'active':''}" href="{baseName}/danger-zone">Danger Zone</a>
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