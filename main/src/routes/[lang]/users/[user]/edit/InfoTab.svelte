<script lang="ts">
	import locs from "$lib/localisation.json";

	export let form: FailFormBase | null;
	export let data: User;
	export let lang: string;

	let loc = locs[lang as keyof typeof locs].user.edit;
</script>
<h4>{loc.info_header}</h4>
<div>
	<form action="?/info" method="post" novalidate>
		<div class="mb-3">
			<label for="username" class="form-label">{loc.username}</label>
			<input type="text" name="username" class="form-control" id="username" value={form?.data?.username || data.username}>
		</div>
		<div class="mb-3">
			<label for="name" class="form-label">{loc.name}</label>
			<input type="text" name="name" class="form-control" id="name" value={form?.data?.name || data.name}>
		</div>
		<div class="mb-4">
			<label for="email" class="form-label">{loc.email}</label>
			<input type="email" name="email" class="form-control" id="email" value={form?.data?.email || data.email}>
		</div>
		{#if form?.error}
			<div class="form-error form-text mb-3">{form.error}</div>
		{/if}
		<div class="mb-3">
			<button type="submit" class="btn btn-accent">{loc.save}</button>
		</div>
	</form>
</div>