<script lang="ts">
	import { page } from "$app/stores";
	import locs from "$lib/localisation.json";

	export let data;

	let loc = locs[data.lang as keyof typeof locs].editor.contests.contest.layout;

	let baseName: string, pageName: string;
	page.subscribe((record)=>{
		baseName = `/${record.params.lang}/editor/contests/${record.params.contest}`;
		pageName = record.url.pathname.replace(baseName, "");
	});
</script>
<svelte:head>
	<title>{data.contest.name} | {loc.edit}</title>
</svelte:head>
<div class="mb-2">
	<h2 class="header">{data.contest.name}: {loc.edit}</h2>
</div>
<ul class="nav mb-2">
	<li class="nav-item">   
		<a class="nav-link {pageName == "" ? "active":""}" href={baseName}>{loc.general}</a>
	</li>
	<li class="nav-item">
		<a class="nav-link {pageName == "/problems" ? "active":""}" href="{baseName}/problems">{loc.problems}</a>
	</li>
	<li class="nav-item">
		<a class="nav-link {pageName == "/participants" ? "active":""}" href="{baseName}/participants">{loc.participants}</a>
	</li>
	<li class="nav-item">
		<a class="nav-link {pageName == "/danger-zone" ? "active":""}" href="{baseName}/danger-zone">{loc.danger_zone}</a>
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