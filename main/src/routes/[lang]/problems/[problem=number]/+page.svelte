<script lang="ts">
    import { page } from '$app/stores';
    import ProblemStatement from '$lib/components/ProblemStatement.svelte';
    import locs from '$lib/localisation.json';

	export let data;

    let loc = locs[data.lang as keyof typeof locs].problems.problem.pages;
</script>
<ProblemStatement examples={data.examples} lang={data.lang} problem={data.problem}/>
<div class="mt-5 mb-5 text-center">
    <button class="btn btn-accent"><a href="{$page.url.pathname}/send">{loc.submit}</a></button>
</div>
<style>
    button a{
        color: inherit; 
        text-decoration: inherit;
    }
</style>