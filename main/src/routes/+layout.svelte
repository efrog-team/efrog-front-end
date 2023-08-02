
<script>
	import { page } from '$app/stores';
    import {invalidateAll } from '$app/navigation';
    export let data;

    async function logout(){
        const res = await fetch('/logout', {method: "PUT"});
        invalidateAll();
    }
</script>

<nav class="navbar navbar-dark navbar-expand-sm">
    <div class="container-fluid pt-2 px-md-5">
        <a class="navbar-brand pr-3" href="/"><img src="/logo.png" alt="Logo" height="40"></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
            <li class="nav-item">
            <a class="nav-link {$page.url.pathname === '/tasks' ? 'active':''}" href="/tasks">Завдання</a>
            </li>
            <li class="nav-item">
            <a class="nav-link {$page.url.pathname === '/olimpiads' ? 'active':''}" href="/olimpiads">Олімпіади</a>
            </li>
            <li class="nav-item">
            <a class="nav-link {$page.url.pathname === '/groups' ? 'active':''}" href="/groups">Групи</a>
            </li>
        </ul>
        <ul class="navbar-nav pr-lg-3">
            {#if data?.username}
                <li class="nav-item dropdown">
                    <button class="nav-link dropdown-toggle"  data-bs-toggle="dropdown" aria-expanded="false">
                        {data.username}
                    </button>
                    <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end">
                        <li><a class="dropdown-item" href="/users/{data.username}">Account</a></li>
                        <li><a class="dropdown-item" href="/users/{data.username}/edit">Edit account</a></li>
                        <li><button class="dropdown-item" on:click={logout}>Logout</button></li>
                    </ul>
                </li>
            {:else}
                <li class="nav-item">
                    <a class="nav-link" href="/account/register?back={$page.url.pathname}">Реєстрація</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/account/login?back={$page.url.pathname}">Вхід</a>
                </li>
            {/if}
        </ul>
        </div>
    </div>
</nav>
<div class="main-container mx-auto pt-3 px-4">
    <slot />
</div>

<style>
    nav{
        --bs-navbar-active-color: var(--accent-color);
    }
    .navbar{
        background-color: var(--color3);
    }

    .main-container{
        max-width: 940px;
    }
    .navbar .active{
        color: var(--accent-color);
        font-weight: 500;
    }
    .dropdown-menu-dark{
        --bs-dropdown-bg: var(--color3);
        --bs-dropdown-link-active-bg: var(--color3);
        --bs-dropdown-link-hover-bg: var(--color3);
        --bs-dropdown-link-active-color: var(--accent-color);
        --bs-dropdown-link-hover-color: var(--accent-color);
        --bs-dropdown-link-color: var(--font-color);
        --bs-border-width: 2px
    }
    
    :global(.nav-link){
        --bs-nav-link-color: var(--font-color);
    }
    :global(.nav-link:focus,.nav-link:hover){
        --bs-nav-link-hover-color: var(--accent-color);
    }
</style>