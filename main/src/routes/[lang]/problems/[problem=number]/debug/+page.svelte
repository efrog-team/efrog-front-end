<script lang='ts'>
    import { verdictIcon, versions } from "$lib/config";
    import CodeInput from "$lib/components/CodeInput.svelte";
    import locs from '$lib/localisation.json';

    export let data;
    let loc = locs[data.lang as keyof typeof locs].problems.problem.pages;

    let curLanguage: string;

    let debug: null | {checked: boolean, result: null | DebugResult} = null;

    async function submit(){
        let lang = (document.getElementById("language") as HTMLTextAreaElement).value || "";
        let code = (document.getElementById("solution") as HTMLTextAreaElement).value || "";
        let input = (document.getElementById("input") as HTMLTextAreaElement).value || "";
        if(!code) return;
        
        debug = {checked: false, result: null};
        let response = await fetch(`./debug`, {
            method: 'POST',
            body: JSON.stringify({ lang, code, input }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        debug.result = await response.json();
        debug.checked = true;
    }
</script>

<div class="mb-5 mt-2">
    <div class="mb-3">
        <label for="language" class="form-label">{loc.language}</label>
        <select bind:value={curLanguage} class="form-select" id="language">
            {#each versions as version, i}
                <option value={version} >{version}</option>
            {/each}
        </select>
    </div>
    <div class="mb-3">
        <label for="solution" class="form-label">{loc.code}</label>
        <div id="code-input">
            <CodeInput lang={curLanguage}/>
        </div>
    </div>
    <div class="mb-3 row">
        <div class="col-md-6 col-12 mb-3 mb-md-0">
            <label for="input" class="form-label ">{loc.debug.input}</label>
            <textarea class="form-control scrollbar mb-2" id="input" rows="8"></textarea>
        </div>
        <div class="col-md-6 col-12 mb-3 mb-md-0">
            <label for="output" class="form-label ">{loc.debug.output}</label>
            <textarea class="form-control scrollbar mb-2" id="output" rows="8" value={debug?.result?.output || null} readonly></textarea>
        </div>
    </div>
    <div class="text-end mb-5 d-flex">
        <button on:click={submit} class="col-12 btn btn-accent">{loc.debug.run}</button>
    </div>
    {#if debug?.result}
    <div class="mb-4 result rounded p-3">
        <h4 class="mb-3"><i class="bi {verdictIcon[debug.result?.verdict_text || "" ]}"></i> {debug.result?.verdict_text}</h4>
        <div class="d-flex">
            <div class="col-3">
                <div class="header">{loc.debug.time}</div>
                <div>{debug.result?.time_taken} {loc.debug.ms}</div>
            </div>
            <div class="col-3">
                <div class="header">{loc.debug.cpu}</div>
                <div>{debug.result?.cpu_time_taken} {loc.debug.ms}</div>
            </div>
            <div class="col-3">
                <div class="header">{loc.debug.v_memory}</div>
                <div>{(debug.result.virtual_memory_taken/1000).toFixed(2)} {loc.debug.mb}</div>
            </div>
            <div class="col-3">
                <div class="header">{loc.debug.p_memory}</div>
                <div>{(debug.result.physical_memory_taken/1000).toFixed(2)} {loc.debug.mb}</div>
            </div>
        </div>
    </div>
    {:else if debug}
    <h4><span class="spinner-border me-2"></span> {loc.debug.testing}...</h4>
    {/if}
</div>
<style>
    #code-input{
        position: relative;
    }
    :global(.result){
        background-color: var(--color3);
    }
</style>
