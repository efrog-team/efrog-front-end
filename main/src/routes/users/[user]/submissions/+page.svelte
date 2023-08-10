<script>
    import { verdictIcon, verdicts, languages } from "../../../config";

    export let data;

    let filtered = data.submissions;
    let cLang = "";
    let cVerdict = "";
    $: {
        filtered = data.submissions;
        if(cLang) filtered = filtered.filter((sub) => sub.language_name == cLang);
        if(cVerdict) filtered = filtered.filter((sub) => sub.total_verdict == cVerdict);
    }
</script>
<div class="mb-4 mt-2">
    <h2 class="header">{data.username}: submissions</h2>
</div>
<div class="mb-3">
    <nav class="nav">
        <li class="nav-item dropdown">
            <button class="nav-link dropdown-toggle filter" data-bs-toggle="dropdown" aria-expanded="false">Verdict</button>
            <ul class="dropdown-menu dropdown-menu-dark">
                <li><button class="dropdown-item {cVerdict === "" ? "active": ""}" on:click={ () => cVerdict = "" }>All</button></li>
                {#each verdicts as verdict}
                <li><button class="dropdown-item {cVerdict === verdict ? "active": ""}" on:click={ () => cVerdict = verdict }>{verdict}</button></li>
                {/each}
            </ul>
        </li>
        <li class="nav-item dropdown">
            <button class="nav-link dropdown-toggle filter" data-bs-toggle="dropdown" aria-expanded="false">Language</button>
            <ul class="dropdown-menu dropdown-menu-dark">
                <li><button class="dropdown-item {cLang === "" ? "active": ""}" on:click={ () => cLang = "" }>All</button></li>
                {#each languages as lang}
                <li><button class="dropdown-item {cLang === lang ? "active": ""}" on:click={ () => cLang = lang }>{lang}</button></li>
                {/each}
            </ul>
        </li>
    </nav>
</div>
<div class="mb-5">
    <table class="table-dark table table-hover table table-borderless">
        <thead>
            <tr>
                <th class="header ps-3">id</th>
                <th class="header">Problem</th>
                <th class="header">Date</th>
                <th class="header">Language</th>
                <th class="header">Verdict</th>
            </tr>
        </thead>
        <tbody>
            {#each filtered as sub, i}
            <tr>
                <td class="ps-3">{sub.id}</td>
                <td><a href="/submissions/{sub.id}">{sub.problem_name}</a></td>
                <td>{sub.time_sent}</td>
                <td>{`${sub.language_name} (${sub.language_version})`}</td>
                <td><i class="bi me-2 {verdictIcon[sub.total_verdict]}"></i> {sub.total_verdict}</td>
            </tr>
            {/each}
        </tbody>
    </table>
</div>
