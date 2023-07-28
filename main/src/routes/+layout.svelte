
<script>
	import { page } from '$app/stores';
</script>

<nav class="navbar navbar-dark navbar-expand-sm">
    <div class="container-fluid pt-2 px-4">
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
        <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" href="/profile">Профіль</a>
            </li>
        </ul>
        </div>
    </div>
</nav>
<div class="main-container mx-auto pt-3 px-4">
    <slot />
</div>

<style>
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
    :global(.nav-link){
        --bs-nav-link-color: var(--font-color);
    }
    :global(.nav-link:focus,.nav-link:hover){
        --bs-nav-link-hover-color: var(--accent-color);
    }
</style>