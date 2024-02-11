<script lang="ts">
	import AdditionModal from "$lib/components/AdditionModal.svelte";
	import { goto, invalidateAll } from "$app/navigation";
	import TeamsFilters from "../TeamsFilters.svelte";
	import locs from "$lib/localisation.json";

	export let data;
	export let form;

	let loc = locs[data.lang as keyof typeof locs].teams;

	let newName = form?.data?.teamName || data.teamInfo.name;
	let filtered = data.members;

	async function action(type: string){
		await fetch("./edit", {
			method: "PUT",
			body: JSON.stringify({ action: type, owner: data.teamInfo.owner_user_username }),
			headers: {
				"Content-Type": "application/json"
			}
		});
		if(type == "delete"){
			goto(`/${data.lang}/users/${data.teamInfo.owner_user_username}/teams`, {replaceState: true});
			return;
		}
		invalidateAll();
	}
</script>
<svelte:head>
	<title>{data.teamInfo.name} | {loc.edit_team}</title>
</svelte:head>
<div class="mb-4">
	<h2 class="header">{loc.edit_team}</h2>
</div>
<div class="mb-4">
	<form action="?/rename" method="post">
		<label for="exampleFormControlInput1" class="form-label">{loc.team_name}</label>
		<div class="d-flex mb-3">
			<input type="text" class="form-control me-1 me-sm-3" id="nameInput" name="teamName" bind:value={newName}>
			<button class="px-sm-4 px-lg-5 btn {newName == data.teamInfo.name ? "disabled btn-secondary" : "btn-accent"}">{loc.save_team_name}</button>
		</div>
		{#if form?.error && form?.data.teamName}
			<div class="form-error form-text mb-3">{form.error}</div>
		{/if}
	</form>
</div>
<div class="mt-5 mb-3">
	<h4>{loc.members}</h4>
</div>
<div class="mb-4">
	<button class="btn btn-accent {form?.error ? "disabled" : ""}" data-bs-toggle="modal" data-bs-target="#addition-modal"><i class="bi-plus"></i>{loc.add_member.header}</button>
</div>
<TeamsFilters lang={data.lang} bind:data={filtered} />
<div class="mb-4">
	<ul class="list-group">
		{#each filtered as member}     
			<span class="list-group-item list-group-item-action d-flex">
				<span class="flex-grow-1">
					{#if data.teamInfo.owner_user_username == member.member_username}
						<span><i class="me-2 bi-person-circle"></i></span>
					{:else}
						<i class="me-2 bi bi-{member.confirmed ? "check" : member.declined ? "x" : "question"}-circle"></i>
					{/if}
					<a href="/{data.lang}/users/{member.member_username}"><span>{member.member_username}</span></a>
				</span>
				<span class="me-3">{member.coach ? "coach" : "contestant"}</span>
				<button class="nav-link" data-bs-toggle="dropdown" aria-expanded="false">
					<i class="bi-three-dots-vertical"></i>
				</button>
				<form method="post">
					<input type="hidden" name="username" value={member.member_username}>
					<ul class="dropdown-menu dropdown-menu-end dropdown-menu-dark">
						<li><button class="dropdown-item {member.member_username == data.teamInfo.owner_user_username ? "disabled" : ""}" type="submit" formaction="?/delete">{loc.delete_member}</button></li>
						<li>
							{#if member.coach}
								<button class="dropdown-item" type="submit" formaction="?/contestant">{loc.make_contestant}</button>
							{:else}
								<button class="dropdown-item" type="submit" formaction="?/coach">{loc.make_coach}</button>
							{/if}
						</li>
					</ul>
				</form>
			</span>
		{/each}
	</ul>
</div>
<div class="mt-5 mb-4">
	<h4>{loc.danger_zone.header}</h4>
</div>
<div class="mb-3">
	<div class="d-flex justify-content-between">
		{#if data.teamInfo.active}
			<span>{loc.danger_zone.deactivate_info}</span>
			<div><button class="text-nowrap btn btn-outline-danger px-4" on:click={()=>action("deactivate")}>{loc.danger_zone.deactivate}</button></div>
		{:else}
			<span>{loc.danger_zone.activate_info}</span>
			<div><button class="text-nowrap btn btn-outline-danger px-4" on:click={()=>action("activate")}>{loc.danger_zone.activate}</button></div>
		{/if}
	</div>
</div>
{#if data.deletable}
	<div class="mb-4">
		<div class="d-flex justify-content-between">
			<span>{loc.danger_zone.delete_info}</span>
			<div><button class="text-nowrap btn btn-outline-danger px-4" on:click={()=>action("delete")}>{loc.danger_zone.delete}</button></div>
		</div>
	</div>
{/if}
<AdditionModal lang={data.lang} bind:form={form} inputName={"username"} inputLable={loc.add_member.member_username} header={loc.add_member.header}/>
