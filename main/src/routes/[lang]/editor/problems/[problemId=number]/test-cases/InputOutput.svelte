<script lang="ts">
	import { testCaseVisible } from "$lib/config";
	import locs from "$lib/localisation.json";

	export let value: string;
	export let name: "input"|"output";
	export let id:number;
	export let disabledByChecker: boolean = false;

	export let lang: string;
	let loc = locs[lang as keyof typeof locs].editor.problems.problem.test_cases.test_case_data;

	$: disabled = value.length > testCaseVisible;
	$: visibleText = disabled ? `${value.slice(0, testCaseVisible)}…` : value;

	function readFile(elem: HTMLInputElement){
		let file = elem.files?.item(0);
		if(!file) return;
		let reader = new FileReader();
		reader.onload = function (e) {
			let text = e.target?.result?.toString(); 
			if(text) value = text;
		};
		reader.readAsText(file);
		elem.value = "";
	}
</script>
<label for="{name}-{id}" class="form-label">{name=="input"?loc.input_data:loc.output_data}</label>
<textarea value={visibleText} class="form-control mb-2" id="{name}-{id}" rows="8" disabled={disabled || disabledByChecker} on:input={(e)=>value=e.currentTarget.value}></textarea>

<input disabled={disabledByChecker} type="file" accept=".txt" id="file-{name}-{id}" on:change={(e)=>readFile(e.currentTarget)}>
<label for="file-{name}-{id}" class="btn btn-dark {disabledByChecker ? "disabled" : ""}">{loc.from_file}</label>
{#if disabled}
	<button class="btn btn-dark" on:click={()=>value=""}>{loc.clear_disabled}</button>
{/if}
<input type="hidden" name={name} value={value}>

<style>
    textarea{
        white-space: pre;
        overflow: auto;
    }
    textarea:disabled{
        white-space: initial
    }
</style>