<script lang="ts">
	import { onMount } from "svelte";

	export let id = "deleteModal";
	export let type: string;
	export let name: string;
	export let action: string;
	export let error = false;

	let passVisible = false;
	onMount(()=>{
		document.getElementById(id)?.addEventListener("hide.bs.modal", () => {
			error = false;
		});
		let modal = new window.bootstrap.Modal(`#${id}`);
		if(error) modal.show();
	});
</script>
<div class="modal fade" id={id} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">Confirm deletion</h5>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">
				<div class="mb-3">
					<p>If you want to delete {type} <em><b>{name}</b></em> , enter your password.</p>
				</div>
				<form method="post" action={action} id="form">
					<div class="mb-3">
						<label for="password" class="col-form-label">Password:</label>
						<div class="input-group">
							<input type={passVisible ? "text":"password"} class="form-control" id="password" name="password">
							<button class="input-group-text" on:click|preventDefault={()=>{passVisible = !passVisible;}}>
								<i class="bi-eye{passVisible ? "-slash": ""}"></i>
							</button>
						</div>
						{#if error}
							<div class="form-error">Wrong password</div>    
						{/if}
					</div>
				</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-dark" data-bs-dismiss="modal">Cancel</button>
				<button type="submit"  form="form" class="btn btn-outline-danger">Confirm</button>
			</div>
		</div>
	</div>
</div>
<style>
    .modal{
        --bs-modal-border-color: var(--error-color);
    }
    b{
        color: var(--error-color);
    }
    input:focus{
        box-shadow: var(--box-error-shadow);
    }
</style>