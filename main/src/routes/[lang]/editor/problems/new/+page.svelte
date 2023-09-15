<script lang="ts">
    import ProblemEdit from "../ProblemEdit.svelte";

    export let form: any;
</script>

<div class="mb-3">
    <h2 class="header">Create new problem</h2>
</div>
<ProblemEdit newProblem={true} info={form}/>
<div class="pb-4"></div>
