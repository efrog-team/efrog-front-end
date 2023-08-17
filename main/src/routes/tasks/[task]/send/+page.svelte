<script lang='ts'>
    import { versions } from "../../../config";
    import CodeInput from "./CodeInput.svelte";

    let curLanguage: string;
</script>

<form class="mb-5 mt-2" action="?/submit" method="post" >
    <div class="mb-3">
        <label for="language" class="form-label">Мова програмування</label>
        <select bind:value={curLanguage} class="form-select" id="language" name="language">
            {#each versions as version, i}
                <option value={version} >{version}</option>
            {/each}
          </select>
      </div>
        <div class="mb-3">
            <label for="solution" class="form-label">Код програми</label>
            <div id="code-input">
                <CodeInput lang={curLanguage}/>
            </div>
        </div>
        <div class="text-end mb-3 d-flex">
            <button type="submit" class="col-12 btn btn-accent">Надіслати розв'язок</button>
        </div>
</form>
<style>
    #code-input{
        position: relative;
    }
</style>
