<script lang="ts">
    import { page } from "$app/stores";

    export let currentPage: number, maxPage: number;

    $: firstPage = Math.max(currentPage - 2, 0);
    $: lastPage = Math.min(currentPage + 2, maxPage);
    $: pageRange = Array.from(
        { length: lastPage - firstPage + 1 },
        (value, index) => firstPage + index
    );
</script>
<nav>
    <ul class="pagination justify-content-center">
      <li class="page-item">
        <a class="page-link {currentPage == 0 ? "disabled" : ""}" href="/{$page.params.lang}/problems?page={currentPage-1}" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
        </a>
        </li>
        {#if firstPage > 0}
        <li class="page-item"><a class="page-link" href="/{$page.params.lang}/problems?page=0">1</a></li>
        <li class="page-item"><span class="page-link disabled" >...</span></li>
        {/if}
        {#each pageRange as n}
        <li class="page-item"><a class="page-link {currentPage == n ? "active" : ""}" href="/{$page.params.lang}/problems?page={n}">{n + 1}</a></li>
        {/each}
        {#if lastPage < maxPage}
        <li class="page-item"><span class="page-link disabled" >...</span></li>
        <li class="page-item"><a class="page-link" href="/{$page.params.lang}/problems?page={maxPage}">{maxPage + 1}</a></li>
        {/if}
        <li class="page-item">
        <a class="page-link {currentPage == maxPage ? "disabled" : ""}" href="/{$page.params.lang}/problems?page={currentPage+1}" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
</nav>