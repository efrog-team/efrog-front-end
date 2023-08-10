<script lang="ts">
    import { invalidateAll } from "$app/navigation";
    import { onMount } from "svelte";
    import GeneralInfo from "../GeneralInfo.svelte";
    import TestCases from "./TestCases.svelte";

    export let data;

    if(!data.info.results) data.info.results = [];

    onMount(()=>{
        if(data.info.checked) return;

        let socket = new WebSocket(data.info.realime_link || '');
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
                    console.log(json.message);
                    invalidateAll();
                    break;
            }
        };
    });
</script>
<GeneralInfo info={data.info} />
{#if data.info.checked && !data.info.compiled}
<div class="d-flex">
    <h4 class="me-auto">Error Details</h4>
</div>
<div class="mb-5">
    <div class="mt-2 backing code p-3">{data.info?.compilation_details}</div>
</div>
{:else}
<TestCases info={data.info} />
{/if}
<div class="mb-3">
    <h4>Code</h4>
</div>
<div class="mb-4">
    <div class="mt-2 backing code p-3">{data.info.code}</div>
</div>
<style>
    .code{
        white-space: pre-wrap;
        font-family: monospace;
    }
</style>