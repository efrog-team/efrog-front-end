<script lang="ts">
    import ContestEdit from "../ContestEdit.svelte";

    export let data;
    export let form;
</script>
<ContestEdit lang={data.lang} info={form || {data: data.competition}}/>
