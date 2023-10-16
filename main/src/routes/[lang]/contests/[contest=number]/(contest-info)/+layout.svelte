<script lang='ts'>
    import { page } from '$app/stores';
    export let data;

    let baseName: string = '';
    let pageName: string = '';

    page.subscribe((record)=>{
        baseName = `/${record.params.lang}/contests/${record.params.contest}`;
        pageName = record.url.pathname.replace(baseName, "");
    });

</script>
<ul class="nav mb-2">
    <li class="nav-item">   
        <a class="nav-link {pageName == '' ? 'active':''}" href={baseName}>General</a>
    </li>
    {#if data.contest.status == 'unstarted'}
    <li class="nav-item">
        <a class="nav-link {pageName === '/participants' ? 'active':''}" href="{baseName}/participants">Participants</a>
    </li>
    {:else}
    <li class="nav-item">
        <a class="nav-link {pageName === '/scoreboard' ? 'active':''}" href="{baseName}/scoreboard">Scoreboard</a>
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