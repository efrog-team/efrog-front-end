<script lang="ts">
    export let data;
    let all = data;

    enum Statuses{
        confirmed,
        notConfirmed,
        declined,
        all
    }
    let cStatus = Statuses.all;

    enum Roles{
        all,
        coach,
        contestant
    }
    let cRole = Roles.all;

    $: {
        data = all.filter((member: any) => {
            return cStatus == Statuses.all || 
            (cStatus == Statuses.confirmed && member.confirmed ) ||
            (cStatus == Statuses.declined && member.canceled ) ||
            (cStatus == Statuses.notConfirmed && !member.canceled && !member.confirmed);
        });
        data = data.filter((member: any) => {
            return cRole == Roles.all || (cRole == Roles.coach) == member.coach; 
        });
    }
</script>
<div class="mb-2">
    <nav class="nav">
        <li class="nav-item dropdown">
            <button class="nav-link dropdown-toggle filter" data-bs-toggle="dropdown" aria-expanded="false">Status</button>
            <ul class="dropdown-menu dropdown-menu-dark">
                <li><button class="dropdown-item {cStatus == Statuses.all ? "active": ""}" on:click={ () => cStatus = Statuses.all }>All</button></li>
                <li><button class="dropdown-item {cStatus == Statuses.confirmed ? "active": ""}" on:click={ () => cStatus = Statuses.confirmed }>Confirmed</button></li>
                <li><button class="dropdown-item {cStatus == Statuses.notConfirmed ? "active": ""}" on:click={ () => cStatus = Statuses.notConfirmed }>Not confirmed</button></li>
                <li><button class="dropdown-item {cStatus == Statuses.declined ? "active": ""}" on:click={ () => cStatus = Statuses.declined }>Declined</button></li>
            </ul>
        </li>
        <li class="nav-item dropdown">
            <button class="nav-link dropdown-toggle filter" data-bs-toggle="dropdown" aria-expanded="false">Role</button>
            <ul class="dropdown-menu dropdown-menu-dark">
                <li><button class="dropdown-item {cRole == Roles.all ? "active": ""}" on:click={ () => cRole = Roles.all }>All</button></li>
                <li><button class="dropdown-item {cRole == Roles.coach ? "active": ""}" on:click={ () => cRole = Roles.coach }>Coach</button></li>
                <li><button class="dropdown-item {cRole == Roles.contestant ? "active": ""}" on:click={ () => cRole = Roles.contestant }>Contestant</button></li>
            </ul>
        </li>
    </nav>
</div>