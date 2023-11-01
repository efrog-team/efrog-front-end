<script lang="ts">
	import locs from "$lib/localisation.json";
	import { onMount } from "svelte";

	export let lang: string;
	let loc = locs[lang as keyof typeof locs].contests.contest.main.reg_modal;

	export let teams: Team[];   
	export let form: {error: string} | null;

	onMount(()=>{
		const modal = document.getElementById("reg-modal");
		const nameModal = new window.bootstrap.Modal("#reg-modal");

		if(form?.error) nameModal.show();
		modal?.addEventListener("hide.bs.modal", () => {
			form = null;
		});
	});
	let showTeams = true;
</script>

<div class="modal {form?.error ? "": "fade"}" data-bs-backdrop="static" data-bs-keyboard="false" id="reg-modal" tabindex="-1" aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered">
		<div class="modal-content">
			<div class="modal-header">
				<h1 class="modal-title fs-5">{loc.registration}</h1>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">
				<form id="reg-form" method="post" action="?/register">
					<div class="mb-3">
						<div class="form-check mb-2">
							<input class="form-check-input" type="radio" name="type" id="individual-check" value="individual"
								on:change={()=>showTeams=false}>
							<label class="form-check-label" for="individual-check">{loc.as_individual}</label>
						</div>
						<div class="form-check mb-2">
							<input class="form-check-input" type="radio" name="type" id="team-check" value="team" checked 
								on:change={()=>showTeams=true}>
							<label class="form-check-label" for="team-check">{loc.as_team}</label>
						</div>
						{#if showTeams}
							<select name="team-name" class="form-select">
								{#each teams as team}
									<option value={team.name}>{team.name}</option>
								{/each}
							</select>
						{/if}
					</div>
					{#if form?.error}
						<div class="form-error form-text mb-3">{form.error}</div>
					{/if}
					<slot />
				</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-dark" data-bs-dismiss="modal">{loc.close}</button>
				<button type="submit" class="btn btn-accent" form={"reg-form"}>{loc.register}</button>
			</div>
		</div>
	</div>
</div>