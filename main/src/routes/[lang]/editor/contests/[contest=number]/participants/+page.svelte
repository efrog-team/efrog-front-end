<script lang="ts">
	import AdditionModal from "$lib/components/AdditionModal.svelte";
	import ParticipantsFilter from "./ParticipantsFilter.svelte";
	import locs from "$lib/localisation.json";
	export let data;
	export let form;

	let loc = locs[data.lang as keyof typeof locs].editor.contests.contest.participants;

	let individual = data.contest.maximum_team_members_number == 1;
</script>
<div class="mb-4 mt-3">
	<button class="btn btn-accent {form?.error ? "disabled" : ""}" data-bs-toggle="modal" data-bs-target="#addition-modal"><i class="bi-plus"></i>{loc.add_participant}</button>
</div>
<ParticipantsFilter lang={data.lang} bind:data={data.participants} onlyIndividuals={individual}/>
<div class="mb-4">
	<div class="list-group">
		{#each data.participants as participant}
			<li class="list-group-item list-group-item-action d-flex">
				<span class="me-2"><i class="me-2 bi bi-{participant.participant_confirmed ? "check" : participant.participant_declined ? "x" : "question"}-circle"></i></span>
				<a class="me-auto" href="/{data.lang}/{participant.individual?"users":"teams"}/{participant.username_or_team_name}">
					{participant.username_or_team_name} 
					{#if !participant.individual}
						<i class="bi bi-people-fill"></i>
					{/if}
				</a>
				<span class="me-2">{participant.author_confirmed? `${loc.approved}`:`${loc.unapproved}`}</span>
				<button class="nav-link" data-bs-toggle="dropdown" aria-expanded="false">
					<i class="bi-three-dots-vertical"></i>
				</button>
				<form method="post">
					<input type="hidden" name="name" value={participant.username_or_team_name}>
					<input type="hidden" name="individual" value={participant.individual||null}>
					<ul class="dropdown-menu dropdown-menu-end dropdown-menu-dark">
						{#if !participant.author_confirmed}
							<li> <button class="dropdown-item" type="submit" formaction="?/confirm">{loc.confirm}</button></li>
						{/if}
						<li><button class="dropdown-item" type="submit" formaction="?/delete">{loc.delete}</button></li>
					</ul>
				</form>
			</li>
		{/each}
	</div>
</div>
{#if individual}
	<AdditionModal bind:form={form} lang={data.lang} inputName="name" type="text" header={loc.add_participant} inputLable={loc.username}>
		<input type="hidden" name="individual" value="true">
	</AdditionModal>
{:else}
	<AdditionModal bind:form={form} lang={data.lang} inputName="name" type="text" header={loc.add_participant} inputLable={loc.team_name}>
		<div class="mb-1 mt-2">
			<input class="form-check-input" type="checkbox" name="individual" id="individual">
			<label class="form-check-label" for="individual">{loc.individual}</label>
		</div>
	</AdditionModal>
{/if}