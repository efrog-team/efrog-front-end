<script>
	import { page } from "$app/stores";
</script>
<div class="error-box d-flex align-items-center justify-content-center">
	<div class="text-center">
		<h1 class="display-3 fw-bold">{$page.status}</h1>
		<p class="fs-4">{$page.error?.message}</p>
	</div>
</div>
