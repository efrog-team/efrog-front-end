<script lang="ts">
	import { toLocalDate, formatDate } from "$lib/features";
	import locs from "$lib/localisation.json";

	export let editable = true;
	export let info: | {error?: string, data: Contest | Dictionary} | null = null;
	export let lang: string;

	let forTeams = !!info?.data?.maximum_team_members_number && Number(info?.data?.maximum_team_members_number) > 1;
	let loc = locs[lang as keyof typeof locs].editor.contests.contest_edit;
	if(info?.data.start_time) info.data.start_time = info.data.start_time.replace(" ", "T").slice(0, 16);
	if(info?.data.end_time) info.data.end_time = info.data.end_time.replace(" ", "T").slice(0, 16);

	let start_time =  info?.data.start_time ? toLocalDate(info?.data.start_time) : null;
	let end_time = info?.data.end_time ? toLocalDate(info.data.end_time) : null;
</script>
<form action="?/save" method="post">
	<div class="mb-4">
		<label for="contest-name" class="form-label">{loc.contest_name}</label>
		<input value={info?.data.name || null} type="text" id="contest-name" name="name" class="form-control" >
	</div>
	<div class="mb-4">
		<label for="contest-name" class="form-label">{loc.description} ({loc.optional})</label>
		<textarea rows="5" value={info?.data.description || ""} id="description" name="description" class="form-control" ></textarea>
	</div>
	<hr>
	<div class="mb-4">
		<div class="row align-items-center mb-2">
			<div class="col-sm-5 col-md-3">
				<label for="start-time" class="col-form-label">{loc.start_date}</label>
			</div>
			<div class="col-sm-6 col-md-4">
				<input  type="datetime-local" id="start-time" class="form-control" bind:value={start_time}>
				{#if start_time !== info?.data.start_time }
					<input type="hidden" name="start_time" value={start_time ? formatDate(start_time): null}>
				{/if}
			</div>
		</div>
		<div class="row align-items-center mb-2">
			<div class="col-sm-5 col-md-3">
				<label for="end-time" class="col-form-label">{loc.end_date}</label>
			</div>
			<div class="col-sm-6 col-md-4 ">
				<input type="datetime-local" id="end-time" class="form-control" bind:value={end_time}>
				{#if end_time !== info?.data.end_time}
					<input type="hidden" name="end_time" value={end_time ? formatDate(end_time) : null}>
				{/if}
			</div>
		</div>
	</div>
	<hr>
	<div class="mb-4">
		<div class="mb-1">
			<input class="form-check-input" type="checkbox" name="public" id="public" bind:checked={forTeams}>
			<label class="form-check-label" for="public">{loc.for_teams}</label>
		</div>
		{#if forTeams}
			<div class="row align-items-center mb-4">
				<div class="col-12">
					<label for="max-members" class="col-form-label">{loc.max_members}</label>
				</div>
				<div class="col-sm-6 col-md-4">
					<input value={info?.data.maximum_team_members_number || 3} type="number" step="1" min="1" name="maximum_team_members_number" id="max-members" class="form-control">
				</div>
			</div>
		{:else}
			<input type="hidden" name="maximum_team_members_number" value="1">
		{/if}
		<div class="mb-3 mt-3">
			<input class="form-check-input" type="checkbox" name="auto_confirm_participants" id="auto-confirm" checked={info?.data ? !!info?.data.auto_confirm_participants : true}>
			<label class="form-check-label" for="auto-confirm">{loc.auto_approve}</label>
		</div>
	</div>
	{#if editable}
		<div class="mb-4">
			<button type="submit" class="btn btn-accent mb-2">{loc.save}</button>
			{#if info?.error}
				<div class="form-error">{info?.error}</div>
			{/if}
		</div>
	{/if}
</form>
