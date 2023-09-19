<script lang="ts">
    import { browser } from "$app/environment";
    import locs from '$lib/localisation.json';

    export let form: any;
    export let lang: string;

    let loc = locs[lang as keyof typeof locs].teams.add_member;

    if(browser){
        const memberModal = document.getElementById('memberModal');
        const nameInput = document.getElementById('username');
        memberModal?.addEventListener('shown.bs.modal', () => {
          nameInput?.focus();
        });
    }
</script>

<div class="modal {form?.error ? '': 'fade'}" data-bs-backdrop="static" data-bs-keyboard="false" id="memberModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5">{loc.header}</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="createForm" method="post" action="?/add">
                    <div class="mb-3">
                        <label for="username" class="col-form-label">Member username:</label>
                        <input type="text" class="form-control" name="username" id="username" value={form?.data?.username || ''}>
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