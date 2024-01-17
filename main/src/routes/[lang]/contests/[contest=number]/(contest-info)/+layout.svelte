<script lang='ts'>
	import locs from "$lib/localisation.json";
	import { page } from "$app/stores";
	export let data;

	let loc = locs[data.lang as keyof typeof locs].contests.contest.layout;

	let baseName: string = "";
	let pageName: string = "";

	page.subscribe((record)=>{
		baseName = `/${record.params.lang}/contests/${record.params.contest}`;
		pageName = record.url.pathname.replace(baseName, "");
	});

</script>
<svelte:head>
	<title>{data.contest.name}</title>
</svelte:head>
<ul class="nav mb-2">
	<li class="nav-item">   
		<a class="nav-link {pageName == "" ? "active":""}" href={baseName}>{loc.general}</a>
	</li>
	{#if data.contest.status == "unstarted"}
		<li class="nav-item">
			<a class="nav-link {pageName === "/participants" ? "active":""}" href="{baseName}/participants">{loc.participants}</a>
		</li>
	{:else}
		<li class="nav-item">
			<a class="nav-link {pageName === "/scoreboard" ? "active":""}" href="{baseName}/scoreboard">{loc.scoreboard}</a>
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