<script lang="ts">
    export let data;
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
            <button class="nav-link dropdown-toggle filter" data-bs-toggle="dropdown" aria-expanded="false">Privacy</button>
            <ul class="dropdown-menu dropdown-menu-dark">
                <li><button class="dropdown-item {cPrivacy == Privacy.all ? "active": ""}" on:click={ () => cPrivacy = Privacy.all }>All</button></li>
                <li><button class="dropdown-item {cPrivacy == Privacy.private ? "active": ""}" on:click={ () => cPrivacy = Privacy.private }>Private</button></li>
                <li><button class="dropdown-item {cPrivacy == Privacy.public ? "active": ""}" on:click={ () => cPrivacy = Privacy.public }>Public</button></li>
            </ul>
        </li>
    </nav>
</div>