<script lang="ts">
    import ProblemEdit from "../ProblemEdit.svelte";

    export let data;
    export let form: any;
</script>
<ProblemEdit editable={data.editable} newProblem={false} info={form || {data: data.problem}}/>
