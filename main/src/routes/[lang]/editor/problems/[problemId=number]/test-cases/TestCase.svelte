<script lang="ts">
	import locs from "$lib/localisation.json";
	import InputOutput from "./InputOutput.svelte";
    
	export let info: TestCase | Dictionary;
	export let error: string | null = null;
	export let editable = true;
	export let lang: string;
	let loc = locs[lang as keyof typeof locs].editor.problems.problem.test_cases.test_case_data;
	let opened = !!info.opened;
</script>

<form action="?/save" method="post">
	<input type="hidden" name="id" value={info.id}>
	<div class="form-check mb-3">
		<input class="form-check-input" type="checkbox" name="opened" id="opened-{info.id}" bind:checked={opened}>
		<label class="form-check-label" for="opened-{info.id}">{loc.opened} <span class="form-text">({loc.opened_info})</span></label>
	</div>
	<div class="mb-3">
		<div class="row align-items-center">
			<div class="col-auto">
				<label class="form-label" for="score-{info.id}">{loc.score}</label>
			</div>
			<div class="col-auto">
				<input class="form-control" value={opened ? "0" : info.score } min="0" type="number" name="score" id="score-{info.id}" disabled={opened} readonly={opened}>
			</div>
		</div>
	</div>
	<div class="mb-3 row">
		<div class="col-md-6 col-12 mb-3 mb-md-0">
			<InputOutput id={Number(info.id)} name='input' value={info.input || ""} lang={lang}/>
		</div>
		<div class="col-md-6 col-12">
			<InputOutput id={Number(info.id)} name='output' value={info.solution || ""} lang={lang}/>
		</div>
	</div>
	{#if editable}
		<div>
			<div class="mb-2">
				<button type="submit" class="btn btn-accent me-2">{loc.save}</button>
				{#if info.id != 0}
					<button type="submit" formaction="?/delete" class="btn btn-outline-danger">{loc.delete}</button>
				{/if}
			</div>
			{#if error}
				<div class="form-error">{error}</div>
			{/if}
		</div>
	{/if}
</form>