<script lang='ts'>
    import { page } from '$app/stores';
    import locs from '$lib/localisation.json';

    export let data;
    export let path = "";

    let loc = locs[data.lang as keyof typeof locs].problems.problem.layout;
    let baseName: string = '';
    let pageName: string = '';

    page.subscribe((record)=>{
        baseName = path || `/${record.params.lang}/problems/${record.params.problem}`;
        pageName = record.url.pathname.replace(baseName, "");
    });

</script>
<ul class="nav mb-2">
    <li class="nav-item">   
        <a class="nav-link {pageName == '' ? 'active':''}" href={baseName}>{loc.statement}</a>
    </li>
    <li class="nav-item">
        <a class="nav-link {pageName == '/send' ? 'active':''}" href="{baseName}/send">{loc.submit}</a>
    </li>
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