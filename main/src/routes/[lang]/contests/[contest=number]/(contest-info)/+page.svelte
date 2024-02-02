<script lang="ts">
	import locs from "$lib/localisation.json";
	import { invalidateAll } from "$app/navigation";
	import { toLocalDate } from "$lib/features.js";
	import RegisterModal from "./RegisterModal.svelte";
	import { contestStatusIcon } from "$lib/icons";

	export let data;
	export let form;

	let loc = locs[data.lang as keyof typeof locs].contests.contest.main;

	async function action(type: string){
		if(!data.userInfo) return;
		type += data.userInfo.individual ? "Individual":"Team";
		await fetch(`/${data.lang}/contests/${data.contest.id}`, {
			method: "PUT",
			body: JSON.stringify({ action: type, name: data.userInfo.username_or_team_name }),
		});
		invalidateAll();
	}
</script>
{#if data.userInfo && !data.userInfo.participant_confirmed}
	<div class="alert d-flex align-items-stretch mt-2" role="alert">
		<span class="flex-grow-1 my-auto">{loc.confirm.info}</span>
		<button class="btn btn-accent me-2" on:click={ () => { action("confirm"); } }>{loc.confirm.confirm}</button>
		<button class="btn btn-secondary" on:click={ () => { action("decline"); } }>{loc.confirm.decline}</button>
	</div>
{/if}
{#if data.userInfo && !data.userInfo.author_confirmed}
	<div class="alert mt-2" role="alert">
		<i class="bi bi-exclamation-circle text-error me-2"></i><span>{loc.approve_info}</span>
	</div>
{/if}
<div class="mb-4">
	<h2>
		<span class="header">{data.contest.name} </span>
	</h2>
	{#if data.contest.description.trim()}
		<p class="mb-3">
			{data.contest.description}
		</p>
	{/if}
</div>
{#if !data.userInfo && data.username && data.contest.status != "ended"}
	<div class="mb-4 mt-2">
		{#if data.contest.maximum_team_members_number == 1}
			<form method="post" action="?/register">
				<input type="hidden" name="type" value="individual">
				<button type="submit" class="btn btn-accent">{loc.reg_modal.register}</button>
			</form>
		{:else}
			<button type="submit" class="btn btn-accent" data-bs-toggle="modal" data-bs-target="#reg-modal">{loc.reg_modal.register}</button>
			<RegisterModal lang={data.lang} form={form} teams={data.userTeams}/>
		{/if}
	</div>
{/if}
<div class="mb-5">
	<div class="mb-3">
		<h3>
			<i class="bi {contestStatusIcon[data.contest.status]}"></i>
			{data.contest.status == "ended" ? loc.ended : data.contest.status == "ongoing" ? loc.ongoing : loc.unstarted}
		</h3>
	</div>
	<div class="mb-3">
		<div>{toLocalDate(data.contest.start_time)} — {toLocalDate(data.contest.end_time)}</div>
	</div>
</div>
{#if data.contest.status != "unstarted" && data.problems.length > 0}
	<div class="mb-4">
		<h4>{loc.problems}</h4>
		<div class="mt-3 mb-4">
			<div class="list-group">
				{#each data.problems as problem, i}     
					<li class="list-group-item list-group-item-action d-flex">
						<span class="me-3 number">{String.fromCharCode("A".charCodeAt(0) + i)}</span>
						<a href="/{data.lang}/contests/{data.contest.id}/problems/{problem.id}" class="me-auto">
							{problem.name}
							{#if problem.solved}
								<i class="bi bi-check-circle-fill text-success ms-2"></i>
							{/if}
						</a>
					</li>
				{/each}
			</div>
		</div>
	</div>
{/if}
<style>
    .alert{
        --bs-alert-bg: var(--color3)
    }
</style>