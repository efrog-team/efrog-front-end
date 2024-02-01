<script lang="ts">
	import renderMathInElement from "katex/contrib/auto-render";
	import GeneralInfo from "./GeneralInfo.svelte";
	import Statement from "./Statement.svelte";
	import { katexDelimiters } from "$lib/config";
	import locs from "$lib/localisation.json";

	export let info: {error?: string, data: Problem | Dictionary};
	export let lang: string;

	let loc = locs[lang as keyof typeof locs].editor.problems.problem_edit;

	function preSubmitCheck(event: SubmitEvent): void{
		let container = document.createElement("div");
		document.querySelectorAll("textarea").forEach((el)=>{
			container.innerText = el.value;
			renderMathInElement(container, {
				throwOnError: false,
				output: "html",
				delimiters: katexDelimiters,
				errorColor: "#dc3545"
			});
			if(container.querySelector(".katex-error")){
				info.error = "Invalid LaTeX";
				event.preventDefault();
			}
		});
	}
</script>
<form action="?/save" on:submit={(e)=>preSubmitCheck(e)} method="post">
	<div class="accordion accordion-flush accordion-dark mb-4">
		<div class="accordion-item">
			<h5 class="accordion-header">
				<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#general-panel" aria-expanded="false" aria-controls="general-panel">
					{loc.general_info}
				</button>
			</h5>
			<div id="general-panel" class="accordion-collapse collapse">
				<div class="accordion-body pb-4">
					<GeneralInfo lang={lang} data={info.data}/>
				</div>
			</div>
		</div>
		<div class="accordion-item">
			<h5 class="accordion-header">
				<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#statement-panel" aria-expanded="false" aria-controls="statement-panel">
					{loc.statement}
				</button>
			</h5>
			<div id="statement-panel" class="accordion-collapse collapse">
				<div class="accordion-body pb-4">
					<Statement lang={lang} value={info?.data.statement} inputName={"statement"} rows={8}/>
				</div>
			</div>
		</div>
		<div class="accordion-item">
			<h5 class="accordion-header">
				<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#input-panel" aria-expanded="false" aria-controls="input-panel">
					{loc.input_format}
				</button>
			</h5>
			<div id="input-panel" class="accordion-collapse collapse">
				<div class="accordion-body pb-4">
					<Statement lang={lang} value={info.data.input_statement} inputName={"input_statement"}/>
				</div>
			</div>
		</div>
		<div class="accordion-item">
			<h5 class="accordion-header">
				<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#output-panel" aria-expanded="false" aria-controls="output-panel">
					{loc.output_format}
				</button>
			</h5>
			<div id="output-panel" class="accordion-collapse collapse">
				<div class="accordion-body pb-4">
					<Statement lang={lang} value={info.data.output_statement} inputName={"output_statement"}/>
				</div>
			</div>
		</div>
		<div class="accordion-item">
			<h5 class="accordion-header">
				<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#notes-panel" aria-expanded="false" aria-controls="notes-panel">
					{loc.notes}
				</button>
			</h5>
			<div id="notes-panel" class="accordion-collapse collapse">
				<div class="form-text mt-3">*{loc.optional_field}</div>
				<div class="accordion-body pb-4">
					<Statement lang={lang} value={info.data.notes} inputName={"notes"}/>
				</div>
			</div>
		</div>
	</div>
	
	<div class="mb-4">
		<button type="submit" class="btn btn-accent mb-2">{loc.save}</button>
		{#if info.error}
			<div class="form-error">{info.error}</div>
		{/if}
	</div>
</form>
