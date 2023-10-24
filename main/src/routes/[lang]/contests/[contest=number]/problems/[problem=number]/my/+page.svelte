<script>
    import { page } from "$app/stores";
    import Submissions from "$lib/components/Submissions.svelte";

    export let data;
</script>
<Submissions lang={data.lang} submissions={data.submissions} basePath="/contests/{$page.params.contest}"/>