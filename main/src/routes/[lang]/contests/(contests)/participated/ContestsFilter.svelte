<script lang="ts">
    import locs from '$lib/localisation.json'
    export let data: (Contest&Participant)[];
    export let lang: string;

    let loc = locs[lang as keyof typeof locs].contests.participated;

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
            <button class="nav-link dropdown-toggle filter" data-bs-toggle="dropdown" aria-expanded="false">{loc.status}</button>
            <ul class="dropdown-menu dropdown-menu-dark">
                <li><button class="dropdown-item {cStatus == Statuses.all ? "active": ""}" on:click={ () => cStatus = Statuses.all }>{loc.all}</button></li>
                <li><button class="dropdown-item {cStatus == Statuses.unstarted ? "active": ""}" on:click={ () => cStatus = Statuses.unstarted }>{loc.unstarted}</button></li>
                <li><button class="dropdown-item {cStatus == Statuses.ongoing ? "active": ""}" on:click={ () => cStatus = Statuses.ongoing }>{loc.ongoing}</button></li>
                <li><button class="dropdown-item {cStatus == Statuses.ended ? "active": ""}" on:click={ () => cStatus = Statuses.ended }>{loc.ended}</button></li>
            </ul>
        </li>
        <li class="nav-item dropdown">
            <button class="nav-link dropdown-toggle filter" data-bs-toggle="dropdown" aria-expanded="false">{loc.privacy}</button>
            <ul class="dropdown-menu dropdown-menu-dark">
                <li><button class="dropdown-item {cPrivacy == Privacy.all ? "active": ""}" on:click={ () => cPrivacy = Privacy.all }>{loc.all}</button></li>
                <li><button class="dropdown-item {cPrivacy == Privacy.private ? "active": ""}" on:click={ () => cPrivacy = Privacy.private }>{loc.private}</button></li>
                <li><button class="dropdown-item {cPrivacy == Privacy.public ? "active": ""}" on:click={ () => cPrivacy = Privacy.public }>{loc.public}</button></li>
            </ul>
        </li>
        <li class="nav-item dropdown">
            <button class="nav-link dropdown-toggle filter" data-bs-toggle="dropdown" aria-expanded="false">{loc.registration}</button>
            <ul class="dropdown-menu dropdown-menu-dark">
                <li><button class="dropdown-item {cReg == RegStatuses.all ? "active": ""}" on:click={ () => cReg = RegStatuses.all }>{loc.all}</button></li>
                <li><button class="dropdown-item {cReg == RegStatuses.registered ? "active": ""}" on:click={ () => cReg = RegStatuses.registered }>{loc.registered}</button></li>
                <li><button class="dropdown-item {cReg == RegStatuses.unconfirmed ? "active": ""}" on:click={ () => cReg = RegStatuses.unconfirmed }>{loc.unconfirmed}</button></li>
                <li><button class="dropdown-item {cReg == RegStatuses.unapproved ? "active": ""}" on:click={ () => cReg = RegStatuses.unapproved }>{loc.unapproved}</button></li>
            </ul>
        </li>
    </nav>
</div>