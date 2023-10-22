<script lang="ts">
    import { invalidateAll } from "$app/navigation";
    import { onMount } from "svelte";
    import GeneralInfo from "../GeneralInfo.svelte";
    import TestCases from "./TestCases.svelte";
    import { prismLang } from "$lib/config.js";
    import locs from '$lib/localisation.json';

    export let data;
    if(!data.info.results) data.info.results = [];

    let loc = locs[data.lang as keyof typeof locs].submissions;

    onMount(()=>{
        window.Prism.highlightAll();
        if(data.info.checked) return;

        let socket = new WebSocket(data.info.realtime_link || '');
        socket.onmessage = (event) => {
            const json = JSON.parse(event.data);
            switch (json.type) {
                case "result":
                    data.info.results[data.info.results.length] = json.result;
                    break;
                case "totals":
                    Object.assign(data.info, json.totals);
                    data.info.checked = true;
                    break;
                case "message":
                    if(json.status == 404) invalidateAll();
                    else alert(json.message);
                    break;
            }
        };
    });

    function copyCode(){
        navigator.clipboard.writeText(data.info.code);
    }
</script>

<GeneralInfo lang={data.lang} info={data.info} />
{#if data.info.checked && !data.info.compiled}
<div class="d-flex">
    <h4 class="me-auto">{loc.error_datails}</h4>
</div>
<div class="mb-5">
    <div class="mt-2 backing error-details p-3">{data.info?.compilation_details}</div>
</div>
{:else}
<TestCases lang={data.lang} info={data.info} />
{/if}
<div class="mb-3 d-flex">
    <h4 class="me-auto">Code</h4>
    <button on:click|preventDefault={copyCode} class="nav-link"><i class="me-2 bi bi-files"></i>{loc.copy_code}</button>
</div>
<div class="mb-4">
    <pre class="mt-2 backing code p-3"><code class="language-{prismLang[`${data.info.language_name} (${data.info.language_version})`]}">{data.info.code}</code></pre>
</div>
<style>
    code{
        font-family: monospace;
        overflow: auto;
        tab-size: 4;
        font-size: 1rem;
        line-height: 1.5;
    }
    .error-details{
        white-space: pre-wrap;
        font-family: monospace;
    }
</style>