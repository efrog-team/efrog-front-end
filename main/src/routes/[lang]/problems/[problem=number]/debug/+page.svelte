<script lang='ts'>
	import { versions } from "$lib/config";
	import CodeInput from "$lib/components/CodeInput.svelte";
	import locs from "$lib/localisation.json";
	import { onMount } from "svelte";
	import { verdictIcon } from "$lib/icons.js";

	export let data;
	let loc = locs[data.lang as keyof typeof locs].problems.problem.pages;

	let curLanguage: string;

	let debug: null | {checked: boolean, result: null | DebugResult} = null;

	let codeEl: HTMLTextAreaElement;
	let langEl: HTMLSelectElement;

	onMount(()=>{
		codeEl = document.getElementById("solution") as HTMLTextAreaElement;
		langEl = document.getElementById("language") as HTMLSelectElement;

		codeEl.value = localStorage.getItem("debug") || "";
		curLanguage = localStorage.getItem("lang") || versions[0];
        
		codeEl.focus();
		codeEl.addEventListener("blur", ()=>{
			localStorage.setItem("debug", codeEl.value || "");
		});
		langEl.addEventListener("change", ()=>{
			localStorage.setItem("lang", langEl.value || "");
		});
	});
	async function submit(){
		let lang = (document.getElementById("language") as HTMLSelectElement).value || "";
		let input = (document.getElementById("input") as HTMLTextAreaElement).value || "";
		if(!codeEl.value) return;
        
		debug = {checked: false, result: null};
		let response = await fetch("./debug", {
			method: "POST",
			body: JSON.stringify({ lang, code: codeEl.value, input }),
			headers: {
				"Content-Type": "application/json"
			}
		});
		if(!response.ok){
			alert((await response.json()).message);
			return;
		}
		debug.result = await response.json();
		debug.checked = true;
	}
</script>

<div class="mb-5 mt-2">
	<div class="mb-3">
		<label for="language" class="form-label">{loc.language}</label>
		<select bind:value={curLanguage} class="form-select" id="language">
			{#each versions as version}
				<option value={version} >{version}</option>
			{/each}
		</select>
	</div>
	<div class="mb-3">
		<label for="solution" class="form-label">{loc.code}</label>
		<div id="code-input">
			<CodeInput lang={curLanguage}/>
		</div>
	</div>
	<div class="mb-3 row">
		<div class="col-md-6 col-12 mb-3 mb-md-0">
			<label for="input" class="form-label ">{loc.debug.input}</label>
			<textarea class="form-control mb-2" id="input" rows="8"></textarea>
		</div>
		<div class="col-md-6 col-12 mb-3 mb-md-0">
			<label for="output" class="form-label ">{loc.debug.output}</label>
			<textarea class="form-control mb-2" id="output" rows="8" value={debug?.result?.output || null} readonly></textarea>
		</div>
	</div>
	<div class="text-end mb-5 d-flex">
		<button on:click={submit} class="col-12 btn btn-accent">{loc.debug.run}</button>
	</div>
	{#if debug?.result}
		<div class="mb-4 result rounded p-3">
			<h4 class="mb-4"><i class="bi {verdictIcon[debug.result?.verdict_text || "" ]}"></i> {debug.result?.verdict_text}</h4>
			<div class="d-flex">
				<div class="col-4">
					<span class="header">{loc.debug.time}: </span>
					<span>{debug.result?.time_taken} {loc.debug.ms}</span>
				</div>
				<div class="col-4">
					<span class="header">{loc.debug.cpu}: </span>
					<span>{debug.result?.cpu_time_taken} {loc.debug.ms}</span>
				</div>
				<div class="col-4">
					<span class="header">{loc.debug.p_memory}: </span>
					<span>{(debug.result.physical_memory_taken/1000).toFixed(2)} {loc.debug.mb}</span>
				</div>
			</div>
		</div>
	{:else if debug}
		<h4><span class="spinner-border me-2"></span> {loc.debug.testing}...</h4>
	{/if}
</div>
<style>
    #code-input{
        position: relative;
    }
    :global(.result){
        background-color: var(--color3);
    }
</style>
