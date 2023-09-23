<script lang="ts">
    import { browser } from "$app/environment";
    import locs from '$lib/localisation.json';

    export let form: any;
    export let lang: string;
    let loc = locs[lang as keyof typeof locs].editor.problems.from_hub;

    if(browser){
        const fromHubModal = document.getElementById('fromHubModal');
        const nameInput = document.getElementById('problemId');
        fromHubModal?.addEventListener('shown.bs.modal', () => {
          nameInput?.focus();
        });
    }
</script>

<div class="modal {form?.error ? '': 'fade'}" data-bs-backdrop="static" data-bs-keyboard="false" id="fromHubModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5">{loc.header}</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="createForm" method="post" action="?/fromHub">
                    <div class="mb-3">
                        <label for="problemId" class="col-form-label">{loc.problem_id}:</label>
                        <input type="number" class="form-control" name="problemId" id="problemId" value={form?.data?.problemId || ''}>
                    </div>
                    {#if form?.error}
                        <div class="form-error form-text mb-3">{form.error}</div>
                    {/if}
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-dark" data-bs-dismiss="modal">{loc.close}</button>
                <button type="submit" class="btn btn-accent" form="createForm">{loc.add}</button>
            </div>
        </div>
    </div>
</div>