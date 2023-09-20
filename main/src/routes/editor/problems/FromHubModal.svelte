<script lang="ts">
    import { browser } from "$app/environment";

    export let form: any;
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
                <h1 class="modal-title fs-5">Add problem from Hub</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="createForm" method="post" action="?/fromHub">
                    <div class="mb-3">
                        <label for="problemId" class="col-form-label">Problem id:</label>
                        <input type="number" class="form-control" name="problemId" id="problemId" value={form?.data?.problemId || ''}>
                    </div>
                    {#if form?.error}
                        <div class="form-error form-text mb-3">{form.error}</div>
                    {/if}
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-dark" data-bs-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-accent" form="createForm">Add</button>
            </div>
        </div>
    </div>
</div>