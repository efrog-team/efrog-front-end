<script lang='ts'>
    import { page } from '$app/stores';

    let baseName: string = '';
    let pageName: string = '';

    page.subscribe((record)=>{
        baseName = (record.url.pathname.match(/^\/users\/[^/]+/) || [""])[0];
        pageName = record.url.pathname.replace(baseName, "");
    });

</script>
<ul class="nav">
    <li class="nav-item">   
        <a class="nav-link {pageName == '' ? 'active':''}" href={baseName}>Профіль</a>
    </li>
    <li class="nav-item">
        <a class="nav-link {pageName === '/submissions' ? 'active':''}" href="{baseName}/submissions">Submissions</a>
    </li>
    <li class="nav-item">
        <a class="nav-link {pageName === '/teams' ? 'active':''}" href="{baseName}/teams">Teams</a>
    </li>
    <li class="nav-item">
        <a class="nav-link {pageName === '/problems' ? 'active':''}" href="{baseName}/problems">problems</a>
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