<script lang="ts">
	import AdditionModal from "$lib/components/AdditionModal.svelte";
	import locs from "$lib/localisation.json";

	export let data;
	export let form;
	let loc = locs[data.lang as keyof typeof locs].user.teams;
	let filtered = data.teams;

	enum Owners { me, notMe, all }
	enum Statuses { active, unactive, all }

	let cStatus = Statuses.active;
	let cOwner = Owners.all;

	$: {
		filtered = data.teams.filter( (team) => {
			return cStatus == Statuses.all || (cStatus == Statuses.active) == team.active; 
		});

		filtered = filtered.filter( (team) => {
			return cOwner == Owners.all || (cOwner == Owners.me) == (team.owner_user_username == data.username);
		});
	}
</script>
<svelte:head>
	<title>{data.username} | {loc.teams}</title>
</svelte:head>
<div class="mb-4 mt-2">
	<h2 class="header">{data.username}: {loc.teams}</h2>
</div>
{#if data.me}
	<div class="my-4">
		<button class="btn btn-accent" data-bs-toggle="modal" data-bs-target="#nameModal"><i class="bi-plus"></i> {loc.create_team}</button>
	</div>
{/if}
<div class="mb-2">
	<nav class="nav">
		<li class="nav-item dropdown">
			<button class="nav-link dropdown-toggle filter" data-bs-toggle="dropdown" aria-expanded="false">{loc.status}</button>
			<ul class="dropdown-menu dropdown-menu-dark">
				<li><button class="dropdown-item {cStatus == Statuses.all ? "active": ""}" on:click={ () => cStatus = Statuses.all }>{loc.all}</button></li>
				<li><button class="dropdown-item {cStatus == Statuses.active ? "active": ""}" on:click={ () => cStatus = Statuses.active }>{loc.active}</button></li>
				<li><button class="dropdown-item {cStatus == Statuses.unactive ? "active": ""}" on:click={ () => cStatus = Statuses.unactive }>{loc.unactive}</button></li>
			</ul>
		</li>
		<li class="nav-item dropdown">
			<button class="nav-link dropdown-toggle filter" data-bs-toggle="dropdown" aria-expanded="false">{loc.owner}</button>
			<ul class="dropdown-menu dropdown-menu-dark">
				<li><button class="dropdown-item {cOwner == Owners.all ? "active": ""}" on:click={ () => cOwner = Owners.all }>{loc.all}</button></li>
				<li><button class="dropdown-item {cOwner == Owners.me ? "active": ""}" on:click={ () => cOwner = Owners.me }>{loc.me}</button></li>
				<li><button class="dropdown-item {cOwner == Owners.notMe ? "active": ""}" on:click={ () => cOwner = Owners.notMe }>{loc.not_me}</button></li>
			</ul>
		</li>
	</nav>
</div>
<div class="mt-3 mb-4">
	<div class="list-group">
		{#each filtered as team}     
			<a href = "/{data.lang}/teams/{team.name}" class="list-group-item list-group-item-action d-flex">
				<span class="me-auto">
					{#if team.active}
						<span>{team.name}</span>
					{:else} 
						<s>{team.name}</s>
					{/if}
				</span>
				{#if team.owner_user_username == data.username}
					<span><i class="bi-person-circle"></i></span>
				{/if}
			</a>
		{/each}
	</div>
</div>
<AdditionModal lang={data.lang} bind:form={form} modalId="nameModal" header={loc.create_team} inputLable={loc.team_name} inputName="teamName" action="create" okText={loc.create}/>

<style>
    .filter{
        padding-left: 0;
    }
</style>