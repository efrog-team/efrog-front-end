<script lang="ts">
    import { browser } from "$app/environment";
import locs from '$lib/localisation.json';

    export let form: any;
    export let lang:string;
    let loc = locs[lang as keyof typeof locs].user.teams;

    if(browser){
        const nameModal = document.getElementById('nameModal');
        const nameInput = document.getElementById('teamName');
        nameModal?.addEventListener('shown.bs.modal', () => {
          nameInput?.focus();
        });
    }
</script>

<div class="modal {form?.error ? '': 'fade'}" data-bs-backdrop="static" data-bs-keyboard="false" id="nameModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5">{loc.create_team}</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="createForm" method="post" action="?/create">
                    <div class="mb-3">
                        <label for="teamName" class="col-form-label">{loc.team_name}:</label>
                        <input type="text" class="form-control" name="teamName" id="teamName" value={form?.data?.teamName || ''}>
                    </div>
                    {#if form?.error}
                        <div class="form-error form-text mb-3">{form.error}</div>
                    {/if}
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-dark" data-bs-dismiss="modal">{loc.close}</button>
                <button type="submit" class="btn btn-accent" form="createForm">{loc.create}</button>
            </div>
        </div>
    </div>
</div>