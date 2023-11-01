<script lang="ts">
	import { page } from "$app/stores";
	import { verdictIcon } from "$lib/icons";
	import { convertDate } from "$lib/features";
	import locs from "$lib/localisation.json";

	export let pathToProblems = "";
	export let info: SubmissionPrivate | SubmissionPublic;
	export let lang: string;

	let loc = locs[lang as keyof typeof locs].submissions;
</script>
<div class="mt-3 mb-4 d-flex">
	<h3 class="header me-auto">#{info.id}</h3>
	{#if info.total_verdict}
		<h4 class="me-2"><i class="bi {verdictIcon[info.total_verdict]}"></i></h4>
		<h4>{info.total_verdict}</h4>
	{:else}
		<div class="spinner-border me-2"></div>
		<h4>Testing...</h4>
	{/if}
</div>
<div class=" row mb-5">
	<div class="col-3">
		<div class="header mb-2">{loc.author}:</div>
		<div><a href="/{$page.params.lang}/users/{info.author_user_username}">{info.author_user_username}</a></div>
	</div>
	<div class="col-3">
		<div class="header mb-2">{loc.problem}:</div>
		<div><a href="/{$page.params.lang}{pathToProblems}/problems/{info.problem_id}">{info.problem_name}</a></div>
	</div>
	<div class="col-3">
		<div class="header mb-2">{loc.language}:</div>
		<div>{`${info.language_name} (${info.language_version})`}</div>
	</div>
	<div class="col-3">
		<div class="header mb-2">{loc.date}:</div>
		<div>{convertDate(info.time_sent)}</div>
	</div>
</div>
<style>
    a:hover{
        text-decoration: underline;
    }
</style>