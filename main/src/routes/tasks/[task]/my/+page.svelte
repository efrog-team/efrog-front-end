<script>
    import Submissions from "$lib/components/Submissions.svelte";

    export let data;
</script>
<div class="mt-4"></div>
<Submissions submissions={data.submissions} />