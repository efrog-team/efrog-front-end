<script lang="ts">
	import { goto, invalidateAll } from "$app/navigation";
	import locs from "$lib/localisation.json";

	export let data;
	let loc = locs[data.lang as keyof typeof locs].editor.problems.problem.danger_zone;

	async function action(type: string){
		await fetch("./danger-zone", {
			method: "PUT",
			body: JSON.stringify({ action: type }),
			headers: {
				"Content-Type": "application/json"
			}
		});
		if(type == "delete"){
			goto(`/${data.lang}/editor/problems`);
			return;
		}
		invalidateAll();
	}
</script>

<div class="mb-3 mt-4">
	<div class="d-flex justify-content-between">
		{#if data.problem.private}
			<span>{loc.make_public_info}</span>
			<div><button class="text-nowrap btn btn-outline-danger px-4" on:click={()=>action("make_public")}>{loc.make_public}</button></div>
		{:else}
			<span >{loc.make_private_info}</span>
			<div><button class="text-nowrap btn btn-outline-danger px-4" on:click={()=>action("make_private")}>{loc.make_private}</button></div>
		{/if}
	</div>
</div>
{#if data.deletable}
	<div class="mb-3">
		<div class="d-flex justify-content-between">
			<span>{loc.delete_info}</span>
			<div><button class="text-nowrap btn btn-outline-danger px-4" on:click={()=>action("delete")}>{loc.delete}</button></div>
		</div>
	</div>
{/if}
<div class="mb-3">
	<div class="d-flex justify-content-between">
		<span>{loc.delete_submissions_info}</span>
		<div><button class="text-nowrap btn btn-outline-danger px-4" on:click={()=>action("delete_submissions")}>{loc.delete_submissions}</button></div>
	</div>
</div>
