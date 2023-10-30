<script lang="ts">
    import ContestEdit from "../ContestEdit.svelte";

    export let data;
    export let form;
</script>
<ContestEdit lang={data.lang} info={{error: form?.error, data: data.contest}}/>
