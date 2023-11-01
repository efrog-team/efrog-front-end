<script lang="ts">
	import TestCase from "./TestCase.svelte";
	import locs from "$lib/localisation.json";

	export let data;
	export let form;
	let loc = locs[data.lang as keyof typeof locs].editor.problems.problem.test_cases;

	let createMode = false;
    
	function addTestCase(){
		createMode = true;
		let newCase = {
			id: 0,
			problem_id: Number(data.id),
			input: "",
			solution: "",
			score: 0,
			opened: false,
		};
		data.testCases = [...data.testCases, newCase];
	}

	if(form?.id == 0) addTestCase();
</script>
{#if data.editable}
	<div class="mb-3 mt-3">
		<button on:click={addTestCase} class="btn btn-accent" disabled={createMode}><i class="bi bi-plus-lg"></i> {loc.add_test_case}</button>
	</div>
{/if}
<div class="accordion accordion-flush accordion-dark mb-4">
	{#each data.testCases as testCase, i}
		<div class="accordion-item">
			<h5 class="accordion-header">
				<button class="accordion-button {testCase.id && form?.id !== testCase.id ? "collapsed" : ""}" type="button" data-bs-toggle="collapse" data-bs-target="#panel-{testCase.id}" aria-expanded="false" aria-controls="panel-{testCase.id}">
					{testCase.id ? `${loc.test_case} ${i+1}` : `${loc.new_test_case}`}
				</button>
			</h5>
			<div id="panel-{testCase.id}" class="accordion-collapse {testCase.id && form?.id !== testCase.id ? "collapse" : ""}">
				<div class="accordion-body pb-4">
					<TestCase lang={data.lang} editable={data.editable} error={form?.id === testCase.id ? form.error : null} info={form?.id == testCase.id ? form?.data : testCase}/>
				</div>
			</div>
		</div>
	{/each}
</div>
<div class="mb-5">
	<h4>{loc.total_score}: <span class="text-accent">{data.testCases.reduce((acc, cur) => acc + cur.score, 0)}</span></h4>
</div>