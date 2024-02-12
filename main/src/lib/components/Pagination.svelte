<script lang="ts">
	import { page } from "$app/stores";

	export let currentPage: number, lastPage: boolean;
	
	$: params = new URLSearchParams($page.url.searchParams);
	let toPage = (page: number)=> {
		params.set("page", page+"");
		return `?${params.toString()}`;
	};
</script>
<nav>
	<ul class="pagination justify-content-center">
		<li class="page-item">
			<a class="page-link {currentPage == 0 ? "disabled" : ""}" href={currentPage == 0 ? "#":$page.url.pathname+toPage(currentPage-1)} aria-label="Previous">
				<span aria-hidden="true">&laquo;</span>
			</a>
		</li>
		<li class="page-item"><a class="page-link active" href="{$page.url.pathname}{toPage(currentPage)}">{currentPage + 1}</a></li>
		<li class="page-item">
			<a class="page-link {lastPage ? "disabled" : ""}" href={lastPage? "#": $page.url.pathname+toPage(currentPage+1)} aria-label="Next">
				<span aria-hidden="true">&raquo;</span>
			</a>
		</li>
	</ul>
</nav>