<script lang='ts'>
    import { page } from '$app/stores';

    export let data;

    let baseName: string = '';
    let pageName: string = '';

    page.subscribe((record)=>{
        baseName = `/${record.params.lang}/contests`;
        pageName = record.url.pathname.replace(baseName, "");
    });
</script>
<ul class="nav mb-2">
    <li class="nav-item">   
        <a class="nav-link {pageName == '' ? 'active':''}" href={baseName}>Public</a>
    </li>
    {#if data.username}
    <li class="nav-item">
        <a class="nav-link {pageName === '/participated' ? 'active':''}" href="{baseName}/participated">Participated</a>
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