<script>
    import Submissions from "../../../components/Submissions.svelte";

    export let data;
</script>
<div class="mt-4"></div>
<Submissions submissions={data.submissions} />