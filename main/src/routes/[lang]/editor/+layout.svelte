<script lang='ts'>
	import { page } from "$app/stores";
	import locs from "$lib/localisation.json";

	export let data;
	let loc = locs[data.lang as keyof typeof locs].editor.layout;

	let baseName: string = "";
	let pageName: string = "";

	page.subscribe((record)=>{
		baseName = `/${record.params.lang}/editor`;
		pageName = record.url.pathname.replace(baseName, "");
	});

</script>
{#if pageName.lastIndexOf("/")==0}
	<ul class="nav">
		<li class="nav-item">
			<a class="nav-link {pageName === "/problems" ? "active":""}" href="{baseName}/problems">{loc.problems}</a>
		</li>
		<li class="nav-item">
			<a class="nav-link {pageName === "/contests" ? "active":""}" href="{baseName}/contests">{loc.contests}</a>
		</li>
		<li class="nav-item">
			<a class="nav-link {pageName === "/limitation" ? "active":""}" href="{baseName}/limitation">{loc.limitations}</a>
		</li>
	</ul>
{/if}
<slot />

<style>
    .nav .nav-link{
        padding-left: 0;
    }

    .active{
        color: var(--accent-color);
    }
</style>