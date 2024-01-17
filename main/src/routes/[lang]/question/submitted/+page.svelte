<script lang="ts">
	import locs from "$lib/localisation.json";
	export let data;
	let loc = locs[data.lang as keyof typeof locs].question;
</script>
<div class="mb-3">
	<div class="mb-3 mt-2">
		<h2 class="header text-center">{loc.submitted}</h2>
	</div>
</div>