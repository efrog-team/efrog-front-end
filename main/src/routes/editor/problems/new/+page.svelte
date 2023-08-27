<script lang="ts">
    import renderMathInElement from "katex/contrib/auto-render";
    import GeneralInfo from "./GeneralInfo.svelte";
    import Statement from "./Statement.svelte";
    import { katexDelimiters } from "$lib/config";
    import { error } from "@sveltejs/kit";

    export let form: any;
    form = form || {};

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
                form.error = "Invalid LaTeX";
                event.preventDefault();
            }
        });
    }
</script>

<div class="mb-3">
    <h2 class="header">Create new problem</h2>
</div>
<form action="?/save" on:submit={(e)=>preSubmitCheck(e)} method="post">
    <div class="accordion accordion-flush accordion-dark mb-4">
        <div class="accordion-item">
            <h5 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#general-panel" aria-expanded="false" aria-controls="general-panel">
                General Info
                </button>
            </h5>
            <div id="general-panel" class="accordion-collapse collapse">
                <div class="accordion-body pb-4">
                    <GeneralInfo />
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h5 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#statement-panel" aria-expanded="false" aria-controls="statement-panel">
                Statement
                </button>
            </h5>
            <div id="statement-panel" class="accordion-collapse collapse">
                <div class="accordion-body pb-4">
                    <Statement inputName={"statement"} rows={8}/>
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h5 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#input-panel" aria-expanded="false" aria-controls="input-panel">
                Input Format
                </button>
            </h5>
            <div id="input-panel" class="accordion-collapse collapse">
                <div class="accordion-body pb-4">
                    <Statement inputName={"input-format"}/>
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h5 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#output-panel" aria-expanded="false" aria-controls="output-panel">
                Output Format
                </button>
            </h5>
            <div id="output-panel" class="accordion-collapse collapse">
                <div class="accordion-body pb-4">
                    <Statement inputName={"output-format"}/>
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h5 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#notes-panel" aria-expanded="false" aria-controls="notes-panel">
                Notes
                </button>
            </h5>
            <div id="notes-panel" class="accordion-collapse collapse">
                <div class="form-text mt-3">*This is optional field</div>
                <div class="accordion-body pb-4">
                    <Statement inputName={"notes"}/>
                </div>
            </div>
        </div>
    </div>
    <div class="mb-5">
        <button type="submit" class="btn btn-accent mb-2">Save</button>
        {#if form.error}
        <div class="form-error">{form.error}</div>
        {/if}
    </div>
</form>
