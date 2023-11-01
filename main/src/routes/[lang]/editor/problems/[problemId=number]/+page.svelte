<script lang="ts">
	import ProblemEdit from "../ProblemEdit.svelte";

	export let data;
	export let form;
</script>
<ProblemEdit lang={data.lang} editable={data.editable} info={form || {data: data.problem}}/>
