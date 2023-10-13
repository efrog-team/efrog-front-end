<script lang="ts">
    import locs from '$lib/localisation.json';
    import type { Participant } from '$lib/server/contest';

    export let data: Participant[];
    export let lang: string;
    export let onlyIndividuals: boolean;

    let loc = locs[lang as keyof typeof locs].editor.contests.contest.participants.participants_filter;

    let all = data;

    enum Confirmations{
        confirmed,
        unconfirmed,
        declined,
        all
    }
    let cConfirmation = Confirmations.all;

    enum Approvals{
        approved,
        unapproved,
        all
    }
    let cApproval = Approvals.all;

    enum Roles{
        all,
        individual,
        team
    }
    let cRole = Roles.all;

    $: {
        data = all.filter((participant: Participant) => {
            return cConfirmation == Confirmations.all || 
            (cConfirmation == Confirmations.confirmed && participant.participant_confirmed ) ||
            (cConfirmation == Confirmations.declined && participant.participant_declined ) ||
            (cConfirmation == Confirmations.unconfirmed && !participant.participant_confirmed && !participant.participant_declined);
        });
        data = data.filter((participant: Participant) => {
            return cApproval == Approvals.all || (cApproval == Approvals.approved) == participant.author_confirmed; 
        });
        data = data.filter((participant: Participant) => {
            return cRole == Roles.all || (cRole == Roles.individual) == participant.individual; 
        });
    }
</script>
<div class="mb-2">
    <nav class="nav">
        {#if !onlyIndividuals}
        <li class="nav-item dropdown">
            <button class="nav-link dropdown-toggle filter" data-bs-toggle="dropdown" aria-expanded="false">{loc.form}</button>
            <ul class="dropdown-menu dropdown-menu-dark">
                <li><button class="dropdown-item {cRole == Roles.all ? "active": ""}" on:click={ () => cRole = Roles.all }>{loc.all}</button></li>
                <li><button class="dropdown-item {cRole == Roles.team ? "active": ""}" on:click={ () => cRole = Roles.team }>{loc.teams}</button></li>
                <li><button class="dropdown-item {cRole == Roles.individual ? "active": ""}" on:click={ () => cRole = Roles.individual }>{loc.individuals}</button></li>
            </ul>
        </li>
        {/if}
        <li class="nav-item dropdown">
            <button class="nav-link dropdown-toggle filter" data-bs-toggle="dropdown" aria-expanded="false">{loc.confirmation}</button>
            <ul class="dropdown-menu dropdown-menu-dark">
                <li><button class="dropdown-item {cConfirmation == Confirmations.all ? "active": ""}" on:click={ () => cConfirmation = Confirmations.all }>{loc.all}</button></li>
                <li><button class="dropdown-item {cConfirmation == Confirmations.confirmed ? "active": ""}" on:click={ () => cConfirmation = Confirmations.confirmed }>{loc.confirmed}</button></li>
                <li><button class="dropdown-item {cConfirmation == Confirmations.unconfirmed ? "active": ""}" on:click={ () => cConfirmation = Confirmations.unconfirmed }>{loc.unconfirmed}</button></li>
                <li><button class="dropdown-item {cConfirmation == Confirmations.declined ? "active": ""}" on:click={ () => cConfirmation = Confirmations.declined }>{loc.declined}</button></li>
            </ul>
        </li>
        <li class="nav-item dropdown">
            <button class="nav-link dropdown-toggle filter" data-bs-toggle="dropdown" aria-expanded="false">{loc.approval}</button>
            <ul class="dropdown-menu dropdown-menu-dark">
                <li><button class="dropdown-item {cApproval == Approvals.all ? "active": ""}" on:click={ () => cApproval = Approvals.all }>{loc.all}</button></li>
                <li><button class="dropdown-item {cApproval == Approvals.approved ? "active": ""}" on:click={ () => cApproval = Approvals.approved }>{loc.approved}</button></li>
                <li><button class="dropdown-item {cApproval == Approvals.unapproved ? "active": ""}" on:click={ () => cApproval = Approvals.unapproved }>{loc.unapproved}</button></li>
            </ul>
        </li>
    </nav>
</div>