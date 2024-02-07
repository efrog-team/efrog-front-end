<script lang="ts">
	import locs from "$lib/localisation.json";
	import CodeInput from "$lib/components/CodeInput.svelte";
	import { versions } from "$lib/config";

	export let data;
	export let form;

	let loc = locs[data.lang as keyof typeof locs].editor.problems.problem.checker;

	let checker = form?.data || data.checker;
	let curLanguage = checker?.language;

	function addChecker(){
		curLanguage = versions[2] || versions[0];
		checker = {
			code: "",
		};
	}
</script>

{#if !checker}
	<button on:click={addChecker} class="btn btn-accent"><i class="bi bi-plus-lg"></i> {loc.add_checker}</button>
{/if}
{#if checker}
	<form class="mt-3" method="post">
		<div class="mb-3">
			<label for="language" class="form-label">{loc.language}</label>
			<select bind:value={curLanguage} class="form-select" id="language" name="language">
				{#each versions as version}
					<option value={version} >{version}</option>
				{/each}
			</select>
		</div>
		<div class="mb-3">
			<label for="solution" class="form-label">{loc.code}</label>
			<CodeInput initialCode={checker?.code} lang={curLanguage || ""}/>
		</div>
		<div>
			<div class="mb-2">
				<button type="submit" class="btn btn-accent me-2" formaction={data.checker ? "?/update" : "?/create"}>{loc.save}</button>
				{#if data.checker}
					<button type="submit" formaction="?/delete" class="btn btn-outline-danger">{loc.delete}</button>
				{/if}
			</div>
			{#if form?.error}
				<div class="form-error">{form?.error}</div>
			{/if}
		</div>
	</form>
{/if}
