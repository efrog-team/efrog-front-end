<script lang="ts">
    import locs from '$lib/localisation.json'
    import { page } from '$app/stores';
    import Layout from '../../../../problems/[problem=number]/+layout.svelte';
    export let data;

    let loc = locs[data.lang as keyof typeof locs].contests.contest.main;
</script>
<div class="mb-2">
   <a class="nav-link" href="/{data.lang}/contests/{$page.params.contest}"> <i class="bi bi-arrow-left"></i> {loc.back}</a>
</div>
<Layout data={data} pathToProblems="/contests/{$page.params.contest}"/>
<slot />