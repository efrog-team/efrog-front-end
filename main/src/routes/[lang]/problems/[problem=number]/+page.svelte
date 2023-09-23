<script lang="ts">
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import renderMathInElement from 'katex/contrib/auto-render'
    import { katexDelimiters } from '$lib/config.js';
    import locs from '$lib/localisation.json';

	export let data;

    let loc = locs[data.lang as keyof typeof locs].problems.problem.main;

    onMount(()=>{
        (document.querySelectorAll(".katex-render") as NodeListOf<HTMLElement>).forEach((elem)=>{
            renderMathInElement(elem, {
                throwOnError: false,
                output: "html",
                errorColor: "#dc3545",
                delimiters: katexDelimiters,
            });
        });
    })
</script>
<svelte:head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css" integrity="sha384-GvrOXuhMATgEsSwCs4smul74iXGOixntILdUW9XmUC6+HX0sLNAK3q71HotJqlAn" crossorigin="anonymous">
</svelte:head>
<div class="mb-3">
    <h2>
        <span class="header">{data.problem.name} </span>
        {#if data.problem.private}
        <i class="bi bi-eye-slash-fill"></i>
        {/if}
    </h2>
</div>
<div class="mb-4">
    <em><p>
        {loc.time_limit}: {data.problem.time_restriction} {loc.sec}<br>
        {loc.memory_limit}: {data.problem.memory_restriction} {loc.mb}
    </p></em>
</div>
<div class="mb-4">
    <h5>{loc.statement}</h5>
    <p class="katex-render">{data.problem.statement}</p>
</div>
<div class="mb-4">
    <h5>{loc.input_format}</h5>
    <p class="katex-render">{data.problem.input_statement}</p>  
</div>
<div class="mb-4">
    <h5>{loc.output_format}</h5>
    <p class="katex-render">{data.problem.output_statement}</p>  
</div>
{#if data.problem.notes}
<div class="mb-4">
    <h5>{loc.notes}</h5>
    <p>{data.problem.notes}</p>  
</div>
{/if}
<div class="mb-4">
    <h5>{loc.examples}</h5>
    {#each data.examples as example, i}
        <div class="mt-3">
            <h6>{loc.example} {i+1}</h6>
            <div class="e-table">
                <div class="row">
                    <div class="col-6 e-item pl-3 pt-1 styled-scrollbars">{loc.input_data}</div>
                    <div class="col-6 e-item pr-3 pt-1 styled-scrollbars">{loc.output_data}</div>
                </div>
                <div class="row">
                    <div class="col-6 e-item pl-3 pb-1 styled-scrollbars">{example.input}</div>
                    <div class="col-6 e-item pr-3 pb-1 styled-scrollbars">{example.solution}</div>
                </div>
            </div>
        </div>
    {/each}
</div>
<div class="mt-5 mb-5 text-center">
    <button class="btn btn-accent"><a href="{$page.url.pathname}/send">{loc.submit}</a></button>
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
    button a{
        color: inherit; 
        text-decoration: inherit;
    }
</style>