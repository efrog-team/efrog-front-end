<script lang='ts'>
    import { versions } from "$lib/config";
    import CodeInput from "$lib/components/CodeInput.svelte";
    import locs from '$lib/localisation.json';

    export let data;
    let loc = locs[data.lang as keyof typeof locs].problems.problem.pages;

    let curLanguage: string;
</script>

<form class="mb-5 mt-2" action="?/submit" method="post" >
    <div class="mb-3">
        <label for="language" class="form-label">{loc.language}</label>
        <select bind:value={curLanguage} class="form-select" id="language" name="language">
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
        <div class="text-end mb-3 d-flex">
            <button type="submit" class="col-12 btn btn-accent">{loc.submit}</button>
        </div>
</form>
<style>
    #code-input{
        position: relative;
    }
</style>
