<script lang='ts'>
    import { page } from '$app/stores';
    import locs from '$lib/localisation.json';

    export let data;
    export let pathToProblems = "";
    export let submitEnabled = true;

    let loc = locs[data.lang as keyof typeof locs].problems.problem.layout;
    let baseName: string = '';
    let pageName: string = '';

    page.subscribe((record)=>{
        baseName = `/${record.params.lang}${pathToProblems}/problems/${record.params.problem}`;
        pageName = record.url.pathname.replace(baseName, "");
    });

</script>
<ul class="nav mb-2">
    <li class="nav-item">   
        <a class="nav-link {pageName == '' ? 'active':''}" href={baseName}>{loc.statement}</a>
    </li>
    {#if submitEnabled}
    <li class="nav-item">
        <a class="nav-link {pageName == '/debug' ? 'active':''}" href="{baseName}/debug">{loc.debug}</a>
    </li>
    <li class="nav-item">
        <a class="nav-link {pageName == '/send' ? 'active':''}" href="{baseName}/send">{loc.submit}</a>
    </li>
    {/if}
    <li class="nav-item">
        <a class="nav-link {pageName == '/my' ? 'active':''}" href="{baseName}/my">{loc.submissions}</a>
    </li>
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