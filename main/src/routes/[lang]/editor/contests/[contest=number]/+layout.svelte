<script lang="ts">
    import { page } from '$app/stores';
    //import locs from '$lib/localisation.json';

    export let data;

    //let loc = locs[data.lang as keyof typeof locs].editor.problems.problem.layout;

    let baseName: string, pageName: string;
    page.subscribe((record)=>{
        baseName = `/${record.params.lang}/editor/contests/${record.params.contest}`
        pageName = record.url.pathname.replace(baseName, "");
    });
</script>

<div class="mb-2">
    <!--text-->
    <h2 class="header">{data.editable ? "Edit contest": "Contest (not editable)"}</h2>
</div>
<ul class="nav mb-2">
    <li class="nav-item">   
        <a class="nav-link {pageName == '' ? 'active':''}" href={baseName}>General info</a>
    </li>
    <li class="nav-item">
        <a class="nav-link {pageName == '/problems' ? 'active':''}" href="{baseName}/problems">Problems</a>
    </li>
    <li class="nav-item">
        <a class="nav-link {pageName == '/participants' ? 'active':''}" href="{baseName}/participants">Participants</a>
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