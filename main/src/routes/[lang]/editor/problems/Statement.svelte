<script lang="ts">
    import { katexDelimiters } from '$lib/config';
    import renderMathInElement from 'katex/contrib/auto-render'
    import { onMount } from 'svelte';

    export let inputName: string;
    export let value: string | null | undefined;
    export let rows = 5;

    function renderTex(textareEl: EventTarget | null){
        let prewiewEl = document.getElementById(`preview-${inputName}`) as HTMLElement;
        prewiewEl.innerText = (textareEl as HTMLTextAreaElement).value;
        
        renderMathInElement(prewiewEl, {
            throwOnError: false,
            output: "html",
            delimiters: katexDelimiters,
            errorColor: "#dc3545"
        });
        
        if(prewiewEl.querySelector(`.katex-error`)){
            (document.getElementById(`form-error-${inputName}`) as HTMLElement).classList.remove("hidden");
            (textareEl as HTMLTextAreaElement).focus();
        }else{
            (document.getElementById(`form-error-${inputName}`) as HTMLElement).classList.add("hidden");
        }
    }

    function changePreview(){
        document.getElementById(`preview-${inputName}`)?.classList.toggle("hidden");
        document.getElementById(`tex-input-${inputName}`)?.classList.toggle("hidden");
    }

    onMount(()=>{
        renderTex(document.getElementById(`ta-${inputName}`));
    });
</script>
<svelte:head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css" integrity="sha384-GvrOXuhMATgEsSwCs4smul74iXGOixntILdUW9XmUC6+HX0sLNAK3q71HotJqlAn" crossorigin="anonymous">
</svelte:head>
<div class="form-check form-switch mb-2">
    <input on:change={changePreview} class="form-check-input" type="checkbox" role="switch" id="priview-{inputName}">
    <label class="form-check-label" for="priview-{inputName}">Show preview</label>
  </div>
<div id="tex-input-{inputName}">
    <textarea id="ta-{inputName}" spellcheck="false" value={value || null} name={inputName} rows={rows} class="form-control" on:focusout={(e)=>renderTex(e.target)}></textarea>
    <div id=form-error-{inputName} class="form-error mt-2 hidden">Invalid LaTeX</div>
</div>
<div id="preview-{inputName}" class="hidden preview pt-2"></div>

<style>
    .hidden{
        display: none;
    }

    .preview{
        min-height: 50px;
    }
</style>