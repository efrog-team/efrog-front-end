<script lang="ts">
    import { page } from '$app/stores';
    import { onMount } from 'svelte';

	export let data;

    onMount(()=>{
        (document.querySelectorAll(".katex-render") as NodeListOf<HTMLElement>).forEach((elem)=>{
            window?.renderMathInElement(elem, {
                throwOnError: false,
                output: "html",
                delimiters: [
                    {left: '$$', right: '$$', display: true},
                    {left: '$', right: '$', display: false},
                ],
            });
        });
    })
</script>
<svelte:head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css" integrity="sha384-GvrOXuhMATgEsSwCs4smul74iXGOixntILdUW9XmUC6+HX0sLNAK3q71HotJqlAn" crossorigin="anonymous">
    <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.js" integrity="sha384-tMzugJpfLv7v0f+KXzNMqNCC6sVzLMM3sCnZDgzy0lcO/0h3sAkEBg/URFcV0JpE" crossorigin="anonymous"></script>
    <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/contrib/auto-render.min.js" integrity="sha384-+VBxd3r6XgURycqtZ117nYw44OOcIax56Z4dCRWbxyPt0Koah1uHoK0o4+/RRE05" crossorigin="anonymous"></script>
</svelte:head>
<div class="mb-3">
    <h2 class="problem-title">{data.task.name}</h2>
</div>
<div class="mb-4">
    <em><p>
        Time limit: {data.task.time_restriction} s<br>
        Memory limit: {data.task.memory_restriction} MB
    </p></em>
</div>
<div class="mb-4">
    <h5>Умова</h5>
    <p class="katex-render">{data.task.statement}</p>
</div>
<div class="mb-4">
    <h5>Вхідні дані</h5>
    <p class="katex-render">{data.task.input_statement}</p>  
</div>
<div class="mb-4">
    <h5>Вихідні дані</h5>
    <p class="katex-render">{data.task.output_statement}</p>  
</div>
{#if data.task.notes}
<div class="mb-4">
    <h5>Примітки</h5>
    <p>{data.task.notes}</p>  
</div>
{/if}
<div class="mb-4">
    <h5>Приклади</h5>
    {#each data.examples as example, i}
        <div class="mt-3">
            <h6>Приклад {i+1}</h6>
            <div class="e-table">
                <div class="row">
                    <div class="col-6 e-item pl-3 pt-1 styled-scrollbars">Вхідні дані</div>
                    <div class="col-6 e-item pr-3 pt-1 styled-scrollbars">Вихідні дані</div>
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
    <button class="btn btn-accent"><a href="{$page.url.pathname}/send">ВІДПРАВИТИ РОЗВ'ЯЗОК</a></button>
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
    .problem-title{
        color: var(--accent-color);
    }
    button a{
        color: inherit; 
        text-decoration: inherit;
    }
</style>