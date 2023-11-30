<script lang="ts">
	import { verdicts, languages } from "$lib/config.js";
	import { page } from "$app/stores";
	import locs from "$lib/localisation.json";
	import { toLocalDate } from "$lib/features";
	import { verdictIcon } from "$lib/icons";

	export let submissions: SubmissionPublic[];
	export let lang: string;
	export let basePath = "";
	let loc = locs[lang as keyof typeof locs].global_components.submissions;

	let filtered = submissions;
	let cLang = "";
	let cVerdict = "";
	$: {
		filtered = submissions;
		if(cLang) filtered = filtered.filter((sub) => sub.language_name == cLang);
		if(cVerdict) filtered = filtered.filter((sub) => sub.total_verdict == cVerdict);
		filtered.sort((a, b)=> Date.parse(b.time_sent) - Date.parse(a.time_sent));
	}
</script>
<div class="mb-3">
	<nav class="nav">
		<li class="nav-item dropdown">
			<button class="nav-link dropdown-toggle filter" data-bs-toggle="dropdown" aria-expanded="false">{loc.verdict}</button>
			<ul class="dropdown-menu dropdown-menu-dark">
				<li><button class="dropdown-item {cVerdict === "" ? "active": ""}" on:click={ () => cVerdict = "" }>{loc.all}</button></li>
				{#each verdicts as verdict}
					<li><button class="dropdown-item {cVerdict === verdict ? "active": ""}" on:click={ () => cVerdict = verdict }>{verdict}</button></li>
				{/each}
			</ul>
		</li>
		<li class="nav-item dropdown">
			<button class="nav-link dropdown-toggle filter" data-bs-toggle="dropdown" aria-expanded="false">{loc.language}</button>
			<ul class="dropdown-menu dropdown-menu-dark">
				<li><button class="dropdown-item {cLang === "" ? "active": ""}" on:click={ () => cLang = "" }>{loc.all}</button></li>
				{#each languages as lang}
					<li><button class="dropdown-item {cLang === lang ? "active": ""}" on:click={ () => cLang = lang }>{lang}</button></li>
				{/each}
			</ul>
		</li>
	</nav>
</div>
<div class="mb-5">
	<table class="table-dark table table-hover table table-borderless">
		<thead>
			<tr>
				<th class="header ps-3">{loc.id}</th>
				<th class="header">{loc.problem}</th>
				<th class="header">{loc.date}</th>
				<th class="header">{loc.language}</th>
				<th class="header">{loc.verdict}</th>
			</tr>
		</thead>
		<tbody>
			{#each filtered as sub}
				<tr>
					<td class="ps-3"><a href="/{$page.params.lang}{basePath}/submissions/{sub.id}">{sub.id}</a></td>
					<td><a href="/{$page.params.lang}{basePath}/problems/{sub.problem_id}">{sub.problem_name}</a></td>
					<td>{toLocalDate(sub.time_sent)}</td>
					<td>{`${sub.language_name} (${sub.language_version})`}</td>
					<td><i class="bi me-2 {verdictIcon[sub.total_verdict]}"></i> {sub.total_verdict}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
<style>
    a:hover {
        text-decoration: underline;
    }
</style>
