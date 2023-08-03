<script lang="ts">
    import { browser } from "$app/environment";

    if(browser){
        const nameModal = document.getElementById('nameModal');
        const nameInput = document.getElementById('teamName');
        nameModal?.addEventListener('shown.bs.modal', () => {
          nameInput?.focus();
        });
    }
</script>

<div class="modal fade " data-bs-backdrop="static" data-bs-keyboard="false" id="nameModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5">Create team</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form>
                    <div class="mb-3">
                        <label for="teamName" class="col-form-label">Team name:</label>
                        <input type="text" class="form-control" id="teamName">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-dark" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-accent">Save changes</button>
            </div>
        </div>
    </div>
</div>