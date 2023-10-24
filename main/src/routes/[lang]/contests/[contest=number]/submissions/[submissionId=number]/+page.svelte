<script lang="ts">
    import locs from '$lib/localisation.json'
    import Page from '../../../../submissions/[submissionId=number]/full/+page.svelte';
    import { page } from '$app/stores';
    export let data;

    let loc = locs[data.lang as keyof typeof locs].contests.contest.main;
</script>
<div class="mb-2">
    <a class="nav-link" href="/{data.lang}/contests/{$page.params.contest}"> <i class="bi bi-arrow-left"></i> {loc.back}</a>
 </div>
<Page data={data} pathToProblems="/contests/{$page.params.contest}"/>