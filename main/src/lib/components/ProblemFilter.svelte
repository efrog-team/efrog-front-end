<script lang="ts">
    import locs from '$lib/localisation.json'
    export let data;
    export let lang: string;

    let loc = locs[lang as keyof typeof locs].global_components.problem_filter;

    let all = data;

    enum Privacy{
        private,
        public,
        all
    }
    let cPrivacy = Privacy.all;

    $: {
        data = all.filter((priblem: any) => {
            return cPrivacy == Privacy.all || (cPrivacy == Privacy.private) == priblem.private; 
        });
    }
</script>
<div class="mb-2">
    <nav class="nav">
        <li class="nav-item dropdown">
            <button class="nav-link dropdown-toggle filter" data-bs-toggle="dropdown" aria-expanded="false">{loc.privacy}</button>
            <ul class="dropdown-menu dropdown-menu-dark">
                <li><button class="dropdown-item {cPrivacy == Privacy.all ? "active": ""}" on:click={ () => cPrivacy = Privacy.all }>{loc.all}</button></li>
                <li><button class="dropdown-item {cPrivacy == Privacy.private ? "active": ""}" on:click={ () => cPrivacy = Privacy.private }>{loc.private}</button></li>
                <li><button class="dropdown-item {cPrivacy == Privacy.public ? "active": ""}" on:click={ () => cPrivacy = Privacy.public }>{loc.public}</button></li>
            </ul>
        </li>
    </nav>
</div>