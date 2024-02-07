<script lang="ts">
	import { page } from "$app/stores";
	import locs from "$lib/localisation.json";

	export let data;

	let loc = locs[data.lang as keyof typeof locs].editor.problems.problem.layout;

	let baseName: string, pageName: string;
	page.subscribe((record)=>{
		baseName = `/${record.params.lang}/editor/problems/${record.params.problemId}`;
		pageName = record.url.pathname.replace(baseName, "");
	});
</script>
<svelte:head>
	<title>{data.problem.name} | {loc.edit}</title>
</svelte:head>
<div class="mb-3">
	<a class="nav-link" href="/{data.lang}/editor/problems"> <i class="bi bi-arrow-left"></i> {loc.back} </a>
</div>
<div class="mb-2">
	<h2 class="header">{data.problem.name}: {loc.edit}</h2>
</div>
<ul class="nav mb-2">
	<li class="nav-item">   
		<a class="nav-link {pageName == "" ? "active":""}" href={baseName}>{loc.statement}</a>
	</li>
	<li class="nav-item">
		<a class="nav-link {pageName == "/test-cases" ? "active":""}" href="{baseName}/test-cases">{loc.test_cases}</a>
	</li>
	<li class="nav-item">
		<a class="nav-link {pageName == "/checker" ? "active":""}" href="{baseName}/checker">{loc.checker}</a>
	</li>
	<li class="nav-item">
		<a class="nav-link {pageName == "/preview" ? "active":""}" href="{baseName}/preview">{loc.preview}</a>
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