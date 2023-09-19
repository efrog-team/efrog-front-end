<script lang="ts">
    import { page } from '$app/stores';
    import locs from '$lib/localisation.json';

	export let data;
    let loc = locs[data.lang as keyof typeof locs].user.main;
</script>
<div class="mb-3">
    <h2 class="user-header">{data.info.username}</h2>
</div>
<div class="mb-4">
    <p>{loc.email}: {data.info.email}</p> 
    <p>{loc.name}: {data.info.name}</p>
</div>

{#if data.me}
<div class="mb-4">
    <div class="mt-5 mb-5 ">
        <button class="btn btn-accent"><a href="{$page.url.pathname}/edit">{loc.profile_edit}</a></button>
    </div>
</div>
{/if}

<style>
    .user-header{
        color: var(--accent-color);
    }
    button a{
        color: inherit; 
        text-decoration: inherit;
    }
</style>