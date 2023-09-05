<script>
    export let data;

    $: firstPage = Math.max(data.page - 2, 0);
    $: lastPage = Math.min(data.page + 2, data.last);
    $: pageRange = Array.from(
        { length: lastPage - firstPage + 1 },
        (value, index) => firstPage + index
    );
</script>
<div class="mb-4 mt-2">
    <h2 class="header">Manage my problems</h2>
</div>
<div class="mt-3 mb-4">
    <div class="list-group">
    {#each data.problems as problem, i}     
        <li class="list-group-item list-group-item-action d-flex">
            <a href="/problems/{problem.id}" class="col-1">{i + 1}</a>
            <a href="/problems/{problem.id}" class="me-auto">{problem.name}</a>
        </li>
    {/each}
    </div>
</div>
<div class="mb-4">
    <nav>
        <ul class="pagination justify-content-center">
          <li class="page-item">
            <a class="page-link {data.page == 0 ? "disabled" : ""}" href="/problems?page={data.page-1}" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {#if firstPage > 0}
          <li class="page-item"><a class="page-link" href="/problems?page=0">1</a></li>
          <li class="page-item"><span class="page-link disabled" >...</span></li>
          {/if}
          {#each pageRange as n}
          <li class="page-item"><a class="page-link {data.page == n ? "active" : ""}" href="/problems?page={n}">{n + 1}</a></li>
          {/each}
          {#if lastPage < data.last}
          <li class="page-item"><span class="page-link disabled" >...</span></li>
          <li class="page-item"><a class="page-link" href="/problems?page={data.last}">{data.last + 1}</a></li>
          {/if}
          <li class="page-item">
            <a class="page-link {data.page == data.last ? "disabled" : ""}" href="/problems?page={data.page+1}" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
</div>