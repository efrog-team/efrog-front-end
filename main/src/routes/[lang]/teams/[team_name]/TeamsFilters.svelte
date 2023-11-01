<script lang="ts">
	import locs from "$lib/localisation.json";

	export let data: Member[];
	export let lang: string;

	let loc = locs[lang as keyof typeof locs].teams.team_filter;

	let all = data;

	enum Statuses{
		confirmed,
		unconfirmed,
		declined,
		all
	}
	let cStatus = Statuses.all;

	enum Roles{
		all,
		coach,
		contestant
	}
	let cRole = Roles.all;

	$: {
		data = all.filter((member) => {
			return cStatus == Statuses.all || 
				(cStatus == Statuses.confirmed && member.confirmed ) ||
				(cStatus == Statuses.declined && member.declined ) ||
				(cStatus == Statuses.unconfirmed && !member.declined && !member.confirmed);
		});
		data = data.filter((member) => {
			return cRole == Roles.all || (cRole == Roles.coach) == member.coach; 
		});
	}
</script>
<div class="mb-2">
	<nav class="nav">
		<li class="nav-item dropdown">
			<button class="nav-link dropdown-toggle filter" data-bs-toggle="dropdown" aria-expanded="false">{loc.status}</button>
			<ul class="dropdown-menu dropdown-menu-dark">
				<li><button class="dropdown-item {cStatus == Statuses.all ? "active": ""}" on:click={ () => cStatus = Statuses.all }>{loc.all}</button></li>
				<li><button class="dropdown-item {cStatus == Statuses.confirmed ? "active": ""}" on:click={ () => cStatus = Statuses.confirmed }>{loc.status_confirmed}</button></li>
				<li><button class="dropdown-item {cStatus == Statuses.unconfirmed ? "active": ""}" on:click={ () => cStatus = Statuses.unconfirmed }>{loc.status_unconfirmed}</button></li>
				<li><button class="dropdown-item {cStatus == Statuses.declined ? "active": ""}" on:click={ () => cStatus = Statuses.declined }>{loc.status_declined}</button></li>
			</ul>
		</li>
		<li class="nav-item dropdown">
			<button class="nav-link dropdown-toggle filter" data-bs-toggle="dropdown" aria-expanded="false">{loc.role}</button>
			<ul class="dropdown-menu dropdown-menu-dark">
				<li><button class="dropdown-item {cRole == Roles.all ? "active": ""}" on:click={ () => cRole = Roles.all }>{loc.all}</button></li>
				<li><button class="dropdown-item {cRole == Roles.coach ? "active": ""}" on:click={ () => cRole = Roles.coach }>{loc.role_coach}</button></li>
				<li><button class="dropdown-item {cRole == Roles.contestant ? "active": ""}" on:click={ () => cRole = Roles.contestant }>{loc.role_contestant}</button></li>
			</ul>
		</li>
	</nav>
</div>