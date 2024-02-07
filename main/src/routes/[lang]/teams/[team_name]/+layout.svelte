<script lang="ts">
	import locs from "$lib/localisation.json";
	export let data;

	let loc = locs[data.lang as keyof typeof locs].teams;

</script>
<div class="mb-3">
	<a class="nav-link" href="/{data.lang}/users/{data.teamInfo.owner_user_username}/teams"> <i class="bi bi-arrow-left"></i> {loc.back}</a>
</div>
<slot />