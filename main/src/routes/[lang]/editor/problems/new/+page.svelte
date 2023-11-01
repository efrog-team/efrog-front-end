<script lang="ts">
	import ProblemEdit from "../ProblemEdit.svelte";
	import locs from "$lib/localisation.json";

	export let data;
	export let form;
	let loc = locs[data.lang as keyof typeof locs].editor.problems;
</script>

<div class="mb-3">
	<h2 class="header">{loc.create_problem}</h2>
</div>
<ProblemEdit lang={data.lang} info={form || { data:{}}}/>
<div class="pb-4"></div>
