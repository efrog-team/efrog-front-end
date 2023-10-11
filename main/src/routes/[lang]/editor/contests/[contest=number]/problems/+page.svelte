<script lang="ts">
    import AdditionModal from '$lib/components/AdditionModal.svelte';
    export let data;
    export let form;
</script>
<div class="mb-4 mt-3">
    <button class="btn btn-accent {form?.error ? 'disabled' : ''}" data-bs-toggle="modal" data-bs-target="#addition-modal"><i class="bi-plus"></i>Add problem</button>
</div>
<div class="mb-4">
    <div class="list-group">
    {#each data.problems as problem, i}
    <li class="list-group-item list-group-item-action d-flex">
        <a href="/{data.lang}/problems/{problem.id}" class="col-1">{String.fromCharCode("A".charCodeAt(0) + i)}</a>
        <a href="/{data.lang}/problems/{problem.id}" class="me-auto">{problem.name}</a>
        <form method="post"> 
            <input type="hidden" name="problemId" value={problem.id}>
            <button formaction="?/delete" class="me-2 nav-link">delete</button>
        </form>
    </li>
    {/each}
    </div>
</div>
<!--text-->
<AdditionModal bind:form={form} lang={data.lang} inputName="problemId" type="number" header="Add problem" inputLable="problemId"/>