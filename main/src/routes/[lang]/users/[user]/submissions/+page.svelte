<script>
    import Submissions from "$lib/components/Submissions.svelte";

    export let data;
</script>
<div class="mb-4 mt-2">
    <h2 class="header">{data.username}: submissions</h2>
</div>
<Submissions data={data} submissions={data.submissions} />