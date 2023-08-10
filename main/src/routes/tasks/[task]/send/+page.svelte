<script lang='ts'>
    import { versions } from "../../../config";
</script>

<form class="mb-5 mt-2" action="?/submit" method="post" >
    <div class="mb-3">
        <label for="language" class="form-label">Мова програмування</label>
        <select class="form-select" id="language" name="language">
            {#each versions as version, i}
                <option value={version} selected={i == 0}>{version}</option>
            {/each}
          </select>
      </div>
        <div class="mb-3">
            <label for="solution" class="form-label">Код програми</label>
            <textarea name="solution" class="form-control" id="solution" rows="20"  required></textarea>
        </div>
        <div class="text-end mb-3 d-flex">
            <button type="submit" class="col-12 btn btn-accent">Надіслати розв'язок</button>
        </div>
</form>

<style>
    textarea{
        font-family: monospace;
        white-space: nowrap;
        overflow-x:auto;
    }
</style>