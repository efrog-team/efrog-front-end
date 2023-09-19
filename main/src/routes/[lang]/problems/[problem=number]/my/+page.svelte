<script>
    import Submissions from "$lib/components/Submissions.svelte";

    export let data;
</script>
<div class="mt-4"></div>
<Submissions lang={data.lang} submissions={data.submissions} />