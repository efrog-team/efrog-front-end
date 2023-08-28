<script lang="ts">
    import renderMathInElement from "katex/contrib/auto-render";
    import GeneralInfo from "./GeneralInfo.svelte";
    import Statement from "./Statement.svelte";
    import { katexDelimiters } from "$lib/config";

    export let info: any;
    export let newProblem: boolean;
    info = info || { data:{}};

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
                General Info
                </button>
            </h5>
            <div id="general-panel" class="accordion-collapse collapse">
                <div class="accordion-body pb-4">
                    <GeneralInfo newProblem={newProblem} data={info.data}/>
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
                    <Statement value={info?.data.statement} inputName={"statement"} rows={8}/>
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
                    <Statement value={info.data.input_statement} inputName={"input_statement"}/>
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
                    <Statement value={info.data["output_statement"]} inputName={"output_statement"}/>
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
                    <Statement value={info.data.notes} inputName={"notes"}/>
                </div>
            </div>
        </div>
    </div>
    <div class="mb-4">
        <button type="submit" class="btn btn-accent mb-2">Save</button>
        {#if info.error}
        <div class="form-error">{info.error}</div>
        {/if}
    </div>
</form>
