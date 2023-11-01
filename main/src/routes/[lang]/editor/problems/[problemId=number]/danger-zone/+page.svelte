<script lang="ts">
	import { invalidateAll } from "$app/navigation";
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
		invalidateAll();
	}
</script>
{#if data.editable}
	<div class="mb-3 mt-3">
		{#if data.problem.private}
			<button class="btn btn-outline-danger px-4" on:click={()=>action("make_public")}>{loc.make_public}</button>
			<span class="text-for-btn btn disabled">{loc.make_public_info}</span>
		{:else}
			<button class="btn btn-outline-danger px-4" on:click={()=>action("make_private")}>{loc.make_private}</button>
			<span class="text-for-btn btn disabled">{loc.make_private_info}</span>
		{/if}
	</div>
	<div class="mb-3">
		<button class="btn btn-outline-danger px-4" on:click={()=>action("delete")}>{loc.delete}</button>
		<span class="text-for-btn btn disabled">{loc.delete_info}</span>
	</div>
{:else}
	<div class="mb-4">
		<button class="btn btn-outline-danger px-4" on:click={()=>action("delete_submissions")}>{loc.delete_submissions}</button>
		<span class="text-for-btn btn disabled">{loc.delete_submissions_info}</span>
	</div>
{/if}
<style>
    .text-for-btn{
        border-color: transparent;
        color: var(--font-color)
    }
</style>