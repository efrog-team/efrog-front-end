<script lang="ts">
    import { onMount } from 'svelte';

    export let data;
    export let form;

    let results: string[] = [];
    onMount(async () => {
        console.log(data,form);
        let socket = new WebSocket("ws://localhost:8000/task");
        socket.onopen = () => {
            socket.send(form?.code + "");
            socket.send(form?.lang + "");
        };
        socket.onmessage = (event) => {
            let message = event.data;
            results[results.length] = message.replace("\r\n", "\n").split("\n");
        };
    });
</script>

<div class="mt-3 mb-4">
    <h3>Результат тестування</h3>
    <ul class="list-group">
    {#each results as res,i}     
        <li class="list-group-item">
            {#each res as mess,j}
                <span>{mess}</span><br>
            {/each}
        </li>
    {/each}
    </ul>
</div>
{#if form?.code}
    <div class="mb-4">
        <h3>Код програми</h3>
        <div class="mt-2 card code p-3">{form.code}</div>
    </div>
{/if}

<style>
    .card{
        border-color: var(--color2);
        background-color: var(--color3);
        color: var(--font-color);
    }

    .code{
        white-space: pre-line;
        font-family: monospace;
    }
</style>
