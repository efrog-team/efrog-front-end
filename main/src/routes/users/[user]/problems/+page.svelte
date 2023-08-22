<script>
    export let data;
</script>
<div class="mb-4 mt-2">
    <h2 class="header">{data.username}: problems</h2>
</div>
<div class="mt-3 mb-4">
    <div class="list-group">
    {#each data.problems as problem}     
        <li class="list-group-item list-group-item-action d-flex">
            <span class="col-1">{problem.id}</span>
            <span class="me-auto">{problem.name}</span>
        </li>
    {/each}
    </div>
</div>