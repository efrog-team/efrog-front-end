<script lang="ts">
    import locs from '$lib/localisation.json'

    export let form: any;
    export let data: any;
    export let lang: string;

    let loc = locs[lang as keyof typeof locs].user.edit;

    let username = form?.data?.username || data.username;
    let email = form?.data?.email || data.email;
</script>

<h4>{loc.info_header}</h4>
<div>
    <form action="?/info" method="post" novalidate>
        <div class="mb-3">
            <label for="username" class="form-label">{loc.username}</label>
            <input type="text" class="form-control" id="username" bind:value={username}>
            <input type="hidden" name = "username" value={username != data.username ? username : null}>
        </div>
        <div class="mb-3">
            <label for="name" class="form-label">{loc.name}</label>
            <input type="text" name="name" class="form-control" id="name" value={form?.data?.name || data.name}>
        </div>
        <div class="mb-4">
            <label for="email" class="form-label">{loc.email}</label>
            <input type="email" class="form-control" id="email" bind:value={email}>
            <input type="hidden" name = "email" value={email != data.email ? email : null}>
        </div>
        {#if form?.error}
            <div class="form-error form-text mb-3">{form.error}</div>
        {/if}
        <div class="mb-3">
            <button type="submit" class="btn btn-accent">{loc.save}</button>
        </div>
    </form>
</div>