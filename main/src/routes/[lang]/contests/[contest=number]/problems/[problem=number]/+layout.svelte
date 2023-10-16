<script lang="ts">
    import { page } from '$app/stores';
    import Layout from '../../../../problems/[problem=number]/+layout.svelte';
    export let data;
</script>
<Layout data={data} path="/{data.lang}/contests/{$page.params.contest}/problems/{$page.params.problem}"/>
<slot />