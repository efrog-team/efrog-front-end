<script lang="ts">
	import { onMount } from "svelte";
	import renderMathInElement from "katex/contrib/auto-render";
	import { katexDelimiters } from "$lib/config.js";
	import locs from "$lib/localisation.json";

	export let problem: Problem;
	export let examples: TestCase[];
	export let lang: string;

	let loc = locs[lang as keyof typeof locs].global_components.problem_statement;

	let statementEl: HTMLElement, inputEl:HTMLElement, outputEl:HTMLElement, notesEl:HTMLElement; 

	onMount(()=>{
		if(statementEl) statementEl.innerText = problem.statement;
		if(inputEl) inputEl.innerText = problem.input_statement;
		if(outputEl) outputEl.innerText = problem.output_statement;
		if(notesEl) notesEl.innerText = problem.notes;
		(document.querySelectorAll(".katex-render") as NodeListOf<HTMLElement>).forEach((elem)=>{
			renderMathInElement(elem, {
				throwOnError: false,
				output: "html",
				errorColor: "#dc3545",
				delimiters: katexDelimiters,
			});
		});
	});
</script>
<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css" integrity="sha384-GvrOXuhMATgEsSwCs4smul74iXGOixntILdUW9XmUC6+HX0sLNAK3q71HotJqlAn" crossorigin="anonymous">
</svelte:head>
<div class="mb-3">
	<h2>
		<span class="header">{problem.name} </span>
		{#if problem.private}
			<i class="bi bi-eye-slash-fill"></i>
		{/if}
		{#if problem.solved}
			<i class="bi bi-check-circle-fill text-success ms-2"></i>
		{/if}
	</h2>
</div>
<div class="mb-4">
	<em><p>
		{loc.time_limit}: {problem.time_restriction} {loc.sec}<br>
		{loc.memory_limit}: {problem.memory_restriction} {loc.mb}
	</p></em>
</div>
<div class="mb-4">
	<h5>{loc.statement}</h5>
	<p class="katex-render" bind:this={statementEl}></p>
</div>
<div class="mb-4">
	<h5>{loc.input_format}</h5>
	<p class="katex-render" bind:this={inputEl}></p>  
</div>
<div class="mb-4">
	<h5>{loc.output_format}</h5>
	<p class="katex-render" bind:this={outputEl}></p>  
</div>
{#if problem.notes}
	<div class="mb-4">
		<h5>{loc.notes}</h5>
		<p class="katex-render"bind:this={notesEl}></p>  
	</div>
{/if}
<div class="mb-4">
	<h5>{loc.examples}</h5>
	{#each examples as example, i}
		<div class="mt-3">
			<h6>{loc.example} {i+1}</h6>
			<div class="e-table">
				<div class="row">
					<div class="col-6 e-item pl-3 pt-1">{loc.input_data}</div>
					<div class="col-6 e-item pr-3 pt-1">{loc.output_data}</div>
				</div>
				<div class="row">
					<div class="col-6 e-item pl-3 pb-1">{example.input}</div>
					<div class="col-6 e-item pr-3 pb-1">{example.solution}</div>
				</div>
			</div>
		</div>
	{/each}
</div>

<style>
    .row{
        margin: 0;
    }
    .e-table{
        background-color: var(--color3);
    }
    .e-item{
        white-space: pre-line;
        border: 1px solid var(--color2);
        overflow-x: auto;
    }
</style>