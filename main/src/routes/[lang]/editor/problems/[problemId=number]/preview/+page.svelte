<script lang="ts">
    import ProblemStatement from '$lib/components/ProblemStatement.svelte';
    export let data;
</script>
<ProblemStatement examples={data.examples} lang={data.lang} problem={data.problem}/>
