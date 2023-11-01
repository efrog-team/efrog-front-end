<script lang='ts'>
	import { page } from "$app/stores";
	import locs from "$lib/localisation.json";

	export let data;
	let loc = locs[data.lang as keyof typeof locs].contests.layout;

	let baseName: string = "";
	let pageName: string = "";

	page.subscribe((record)=>{
		baseName = `/${record.params.lang}/contests`;
		pageName = record.url.pathname.replace(baseName, "");
	});
</script>
<ul class="nav mb-2">
	<li class="nav-item">   
		<a class="nav-link {pageName == "" ? "active":""}" href={baseName}>{loc.public}</a>
	</li>
	{#if data.username}
		<li class="nav-item">
			<a class="nav-link {pageName === "/participated" ? "active":""}" href="{baseName}/participated">{loc.participated}</a>
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