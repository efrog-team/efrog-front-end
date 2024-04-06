
<script lang="ts">
	import { invalidateAll } from "$app/navigation";
	import { page } from "$app/stores";
	import { localisations } from "$lib/config.js";
	import locs from "$lib/localisation.json";
    
	export let data;

	let loc = locs[data.lang as keyof typeof locs].layout;
</script>
<div class="page-container">
	<nav class="navbar navbar-dark navbar-expand-md">
		<div class="container-fluid pt-2 px-md-5">
			<a class="navbar-brand pr-3" href="/{data.lang}"><img src="/logo.png" alt="efrog logo" height="40"></a>
			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarNav">
				<ul class="navbar-nav me-3">
					<li class="nav-item">
						<a class="nav-link {$page.url.pathname.startsWith(`/${data.lang}/problems`) ? "active":""}" href="/{data.lang}/problems">
							{loc.problems}
						</a>
					</li>
				</ul>
				<ul class="navbar-nav me-auto"> 
					<li class="nav-item">
						<a class="nav-link {$page.url.pathname.startsWith(`/${data.lang}/contests`) ? "active":""}" href="/{data.lang}/contests">
							{loc.contests}
						</a>
					</li>
				</ul>
				<ul class="navbar-nav pr-lg-3 ms-auto">
					<li class="nav-item ">
						<a class="nav-link {$page.url.pathname.startsWith(`/${data.lang}/question`) ? "active":""}" href="/{data.lang}/question">
							<span class="d-md-none">{loc.question}</span>
							<i class="bi bi-question-circle d-none d-md-block"></i>
						</a>
					</li>
					{#if data?.username}
						<li class="nav-item dropdown">
							<button class="nav-link dropdown-toggle"  data-bs-toggle="dropdown" aria-expanded="false">
								{data.username}
							</button>
							<ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end">
								<li><a class="dropdown-item" href="/{data.lang}/users/{data.username}">
									{loc.account}
								</a></li>
								<li><a class="dropdown-item" href="/{data.lang}/users/{data.username}/edit">
									{loc.edit_account}
								</a></li>
								<li><a class="dropdown-item" href="/{data.lang}/editor">
									{loc.editor}
								</a></li>
								<li><a class="dropdown-item" href="/{data.lang}/account/logout?back={$page.url}" on:click={invalidateAll}>
									{loc.logout}
								</a></li>
							</ul>
						</li>
					{:else}
						<li class="nav-item">
							<a class="nav-link" href="/{data.lang}/account/register?back={$page.url.pathname}" rel="nofollow">
								{loc.register}
							</a>
						</li>
						<li class="nav-item me-1">
							<a class="nav-link" href="/{data.lang}/account/login?back={$page.url.pathname}" rel="nofollow">
								{loc.login}
							</a>
						</li>
					{/if}
					<li class="nav-item dropdown">
						<button class="nav-link dropdown-toggle"  data-bs-toggle="dropdown" aria-expanded="false">
							{data.lang.toUpperCase()}
						</button>
						<ul class="lang-menu dropdown-menu dropdown-menu-dark dropdown-menu-end">
							{#each localisations as lang}
								<li><a data-sveltekit-reload class="dropdown-item" href="/{lang}/{$page.url.pathname.slice(4)}">
									{lang.toUpperCase()}
								</a></li>
							{/each}
						</ul>
					</li>
				</ul>
			</div>
		</div>
	</nav>
	<section>
		<div class="main-container mx-auto pt-3 px-4">
			<slot />
		</div>
	</section>
	<footer class="pb-2 pt-3 px-4 d-flex">
		<img src="/logo.png" alt="efrog logo">
		<span class="align-middle ms-3">efrog.team@gmail.com</span>
		<span class="align-middle ms-auto">© 2024 efrog</span>
	</footer>
</div>
<style>
	.page-container{
		min-height: 100vh;
		position: relative;
	}
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
    .lang-menu{
        --bs-dropdown-min-width: 0;
    }

	footer{
		background-color: var(--color2);
		font-size: 0.9em;
		font-weight: 100;
		width: 100%;
		position: absolute;
		bottom: 0;
		left: 0;
		flex-wrap: wrap;
        justify-content: space-between;
	}

	footer img{
		height: 2em;
		margin-top: -2px;
	}

	section{
		padding-bottom: 50px;
	}
</style>