<script lang="ts">
    import locs from '$lib/localisation.json';
    import ContestEdit from "../ContestEdit.svelte";

    export let data;
    export let form;
    let loc = locs[data.lang as keyof typeof locs].editor.contests;
</script>

<div class="mb-3">
    <h2 class="header">{loc.create_contest}</h2>
</div>
<ContestEdit lang={data.lang} info={form}/>
<div class="pb-4"></div>
