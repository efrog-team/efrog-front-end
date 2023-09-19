<script lang='ts'>
    import { page } from '$app/stores';
    import locs from '$lib/localisation.json';

    export let data;
    let loc = locs[data.lang as keyof typeof locs].user.layout;

    let baseName: string = '';
    let pageName: string = '';

    page.subscribe((record)=>{
        baseName = `/${record.params.lang}/users/${record.params.user}`;
        pageName = record.url.pathname.replace(baseName, "");
    });

</script>
<ul class="nav">
    <li class="nav-item">   
        <a class="nav-link {pageName == '' ? 'active':''}" href={baseName}>{loc.profile}</a>
    </li>
    <li class="nav-item">
        <a class="nav-link {pageName === '/submissions' ? 'active':''}" href="{baseName}/submissions">{loc.submissions}</a>
    </li>
    <li class="nav-item">
        <a class="nav-link {pageName === '/teams' ? 'active':''}" href="{baseName}/teams">{loc.teams}</a>
    </li>
    <li class="nav-item">
        <a class="nav-link {pageName === '/problems' ? 'active':''}" href="{baseName}/problems">{loc.problems}</a>
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