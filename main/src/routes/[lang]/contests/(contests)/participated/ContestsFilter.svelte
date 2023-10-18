<script lang="ts">
    import locs from '$lib/localisation.json'
    export let data: (Contest&Participant)[];
    //export let lang: string;

    //let loc = locs[lang as keyof typeof locs].global_components.problem_filter;

    let all = data;

    enum Privacy{
        private,
        public,
        all
    }
    enum Statuses {
        ongoing,
        unstarted,
        ended,
        all,
    }
    enum RegStatuses{
        registered,
        unconfirmed,
        unapproved,
        all,
    }

    let cPrivacy = Privacy.all;
    let cStatus = Statuses.all;
    let cReg = RegStatuses.all;

    $: {
        data = all.filter(c => {
            return cPrivacy == Privacy.all || (cPrivacy == Privacy.private) == c.private; 
        });
        data = data.filter( c => {
            return cStatus == Statuses.all || cStatus == Statuses[c.status as keyof typeof Statuses];
        });
        data = data.filter( c => {
            return cReg == RegStatuses.all || (!c.participant_confirmed && cReg==RegStatuses.unconfirmed) ||
                (!c.author_confirmed && cReg==RegStatuses.unapproved) || 
                (c.author_confirmed && c.participant_confirmed && cReg == RegStatuses.registered );
        });
    }
</script>
<div class="mb-2">
    <nav class="nav">
        <li class="nav-item dropdown">
            <button class="nav-link dropdown-toggle filter" data-bs-toggle="dropdown" aria-expanded="false">Status</button>
            <ul class="dropdown-menu dropdown-menu-dark">
                <li><button class="dropdown-item {cStatus == Statuses.all ? "active": ""}" on:click={ () => cStatus = Statuses.all }>All</button></li>
                <li><button class="dropdown-item {cStatus == Statuses.unstarted ? "active": ""}" on:click={ () => cStatus = Statuses.unstarted }>Not started</button></li>
                <li><button class="dropdown-item {cStatus == Statuses.ongoing ? "active": ""}" on:click={ () => cStatus = Statuses.ongoing }>On going</button></li>
                <li><button class="dropdown-item {cStatus == Statuses.ended ? "active": ""}" on:click={ () => cStatus = Statuses.ended }>Ended</button></li>
            </ul>
        </li>
        <li class="nav-item dropdown">
            <button class="nav-link dropdown-toggle filter" data-bs-toggle="dropdown" aria-expanded="false">Privacy</button>
            <ul class="dropdown-menu dropdown-menu-dark">
                <li><button class="dropdown-item {cPrivacy == Privacy.all ? "active": ""}" on:click={ () => cPrivacy = Privacy.all }>All</button></li>
                <li><button class="dropdown-item {cPrivacy == Privacy.private ? "active": ""}" on:click={ () => cPrivacy = Privacy.private }>Private</button></li>
                <li><button class="dropdown-item {cPrivacy == Privacy.public ? "active": ""}" on:click={ () => cPrivacy = Privacy.public }>Public</button></li>
            </ul>
        </li>
        <li class="nav-item dropdown">
            <button class="nav-link dropdown-toggle filter" data-bs-toggle="dropdown" aria-expanded="false">Registration</button>
            <ul class="dropdown-menu dropdown-menu-dark">
                <li><button class="dropdown-item {cReg == RegStatuses.all ? "active": ""}" on:click={ () => cReg = RegStatuses.all }>All</button></li>
                <li><button class="dropdown-item {cReg == RegStatuses.registered ? "active": ""}" on:click={ () => cReg = RegStatuses.registered }>Registered</button></li>
                <li><button class="dropdown-item {cReg == RegStatuses.unconfirmed ? "active": ""}" on:click={ () => cReg = RegStatuses.unconfirmed }>Need confirmation</button></li>
                <li><button class="dropdown-item {cReg == RegStatuses.unapproved ? "active": ""}" on:click={ () => cReg = RegStatuses.unapproved }>Need author approval</button></li>
            </ul>
        </li>
    </nav>
</div>