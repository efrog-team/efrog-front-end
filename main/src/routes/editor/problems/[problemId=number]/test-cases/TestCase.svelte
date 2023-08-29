<script lang="ts">
    export let info: any;
    export let error: any = null;
    export let editable = true;
    let opened = info.opened;
</script>

<form action="?/save" method="post">
    <input type="hidden" name="id" value={info.id}>
    <div class="form-check mb-3">
        <input class="form-check-input" type="checkbox" name="opened" id="opened-{info.id}" bind:checked={opened}>
        <label class="form-check-label" for="opened-{info.id}">Opened <span class="form-text">(shown in examples)</span></label>
    </div>
    <div class="mb-3">
        <div class="row align-items-center">
            <div class="col-auto">
                <label class="form-label" for="score-{info.id}">Score</label>
            </div>
            <div class="col-auto">
                <input class="form-control" value={opened ? 0 : info.score} min="0" type="number" name="score" id="score-{info.id}" disabled={opened} readonly={opened}>
            </div>
        </div>
    </div>
    <div class="mb-3 row">
        <div class="col-md-6 col-12">
            <label for="input-{info.id}" class="form-label">Input</label>
            <textarea value={info.input} class="form-control scrollbar" name="input" id="input-{info.id}" rows="8"></textarea>
        </div>
        <div class="col-md-6 col-12">
            <label for="output-{info.id}" class="form-label">Output</label>
            <textarea value={info.solution} class="form-control scrollbar" name="solution" id="output-{info.id}" rows="8"></textarea>
        </div>
    </div>
    {#if editable}
    <div>
        <div class="mb-2">
            <button type="submit" class="btn btn-accent me-2">Save</button>
            <button type="submit" formaction="?/delete" class="btn btn-outline-danger">Delete</button>
        </div>
        {#if error}
        <div class="form-error">{error}</div>
        {/if}
    </div>
    {/if}
</form>

<style>
    textarea{
        white-space: nowrap;
        overflow: auto;
    }
</style>