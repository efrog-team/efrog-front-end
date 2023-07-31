<script>
    import { page } from '$app/stores';

	export let data;
</script>
<div class="mb-4">
    <h2 class="user-header">{data.username}</h2>
</div>
<div class="mb-4">
    <p>Email: {data.email}</p> 
    <p>Name: {data.name}</p>
</div>

{#if data.me}
<div class="mb-4">
    <div class="mt-5 mb-5 ">
        <button class="btn btn-accent"><a href="{$page.url.pathname}/edit">Edit profile</a></button>
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