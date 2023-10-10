<script lang="ts">
    import { browser } from "$app/environment";
    import locs from '$lib/localisation.json';
    import { onMount } from "svelte";

    export let lang: string;
    let loc = locs[lang as keyof typeof locs].global_components.addition_modal;

    export let form: any;
    export let inputName: string;
    export let header: string;
    export let inputLable: string;
    export let modalId: string = "addition-modal";
    export let action: string = "add";
    export let okText: string = loc.add;
    export let type: string = "text"

    onMount(()=>{
        const modal = document.getElementById(modalId);
        const input = document.getElementById(`${modalId}-input`);
        const nameModal = new window.bootstrap.Modal('#'+modalId);

        if(form?.error && form?.data[inputName]) nameModal.show();
        modal?.addEventListener('hide.bs.modal', () => {
            form = null;
        });
        modal?.addEventListener('shown.bs.modal', () => {
            input?.focus();
        });
    });
</script>

<div class="modal {form?.error ? '': 'fade'}" data-bs-backdrop="static" data-bs-keyboard="false" id={modalId} tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5">{header}</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id={modalId+"-form"} method="post" action="?/{action}">
                    <div class="mb-3">
                        <label for={modalId+"-input"} class="col-form-label">{inputLable}:</label>
                        <input type={type} class="form-control" name={inputName} id={modalId+"-input"} value={form?.data[inputName] || ''}>
                    </div>
                    {#if form?.error}
                        <div class="form-error form-text mb-3">{form.error}</div>
                    {/if}
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-dark" data-bs-dismiss="modal">{loc.close}</button>
                <button type="submit" class="btn btn-accent" form={modalId+"-form"}>{okText}</button>
            </div>
        </div>
    </div>
</div>