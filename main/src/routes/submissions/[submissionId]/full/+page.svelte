<script lang="ts">
    import { invalidateAll } from "$app/navigation";
    import { onMount } from "svelte";
    import GeneralInfo from "../GeneralInfo.svelte";
    import TestCases from "./TestCases.svelte";

    export let data;

    if(data.info.results) data.info.results = [];

    onMount(()=>{
        if(data.info.checked) return;

        // please don't open more than one page with this socket
        let socket = new WebSocket(data.info.realime_link || '');
        socket.onmessage = (event) => {
            console.log(event.data);
            data.info.results[data.info.results.length] = JSON.parse(event.data);
        };
        socket.onclose = () => {
            invalidateAll();
        }
    });
</script>
<GeneralInfo info={data.info} />
{#if data.info.total_verdict === "Compilation Error"}
<div class="d-flex">
    <h4 class="me-auto">Error Details</h4>
</div>
<div class="mb-5">
    <div class="mt-2 backing code p-3">{data.info?.results?.[0]?.verdict_details}</div>
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
        white-space: pre;
        font-family: monospace;
    }
</style>