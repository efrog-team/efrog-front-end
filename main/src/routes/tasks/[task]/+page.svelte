<script>
    import { page } from '$app/stores';

	export let data;
</script>
<div class="mb-4">
    <h2 class="problem-title">{data.task.title}</h2>
    <p>{data.task.problem}</p>  
</div>
<div class="mb-4">
    <h3>Вхідні дані</h3>
    <p>{data.task.inputFormat}</p>  
</div>
<div class="mb-4">
    <h3>Вихідні дані</h3>
    <p>{data.task.outputFormat}</p>  
</div>
{#if data.task.notes}
<div class="mb-4">
    <h3>Примітки</h3>
    <p>{data.task.notes}</p>  
</div>
{/if}
<div class="mb-4">
    <h3>Приклади</h3>
    {#each data.task.examples as example, i}
        <div class="mt-3">
            <h6>Приклад {i+1}</h6>
            <div class="e-table">
                <div class="row">
                    <div class="col-6 e-item pl-3 pt-1">Вхідні дані</div>
                    <div class="col-6 e-item pr-3 pt-1">Вихідні дані</div>
                </div>
                <div class="row">
                    <div class="col-6 e-item pl-3 pb-1">{example.input}</div>
                    <div class="col-6 e-item pr-3 pb-1">{example.output}</div>
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
    }
    .problem-title{
        color: var(--accent-color);
    }
    button a{
        color: inherit; 
        text-decoration: inherit;
    }
</style>