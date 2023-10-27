<script lang="ts">
    import locs from '$lib/localisation.json'
    export let data;

    let loc = locs[data.lang as keyof typeof locs].contests.contest.scoreboard;

    data.scoreboard.forEach(result => result.problems.sort((a,b)=> a.id - b.id));

    let positions: number[] = [];
    for(let i=0; i<data.scoreboard.length; i++){
        positions.push(i==0 || data.scoreboard[i-1]!=data.scoreboard[i] ? i+1 : positions.at(-1) as number);
    }
</script>
{#if data.scoreboard.length}
<div class="mb-5">
    <table class="table-dark table table-hover table table-responsive">
        <thead>
            <tr>
                <th># {loc.participant}</th>
                <th>{loc.total}</th>
                {#each data.scoreboard[0].problems as problem, i}
                    <th>
                        <a href="/{data.lang}/contests/{data.contest.id}/problems/{problem.id}">
                            {String.fromCharCode('A'.charCodeAt(0) + i)}
                        </a>
                    </th>
                {/each}
            </tr>
        </thead>
        <tbody>
            {#each data.scoreboard as result, i}
            <tr>
                <td>
                    <span class="me-1">{positions[i]}.</span>
                    <a class="me-auto" href="/{data.lang}/{result.individual?"users":"teams"}/{result.username_or_team_name}">
                        {result.username_or_team_name} 
                        {#if !result.individual}
                        <i class="bi bi-people-fill"></i>
                        {/if}
                    </a>
                </td>
                <td>{result.total_score!==null?result.total_score: '-'}</td>
                {#each result.problems as problem}
                <td>{problem.best_score!==null?problem.best_score: '-'}</td>
                {/each}
            </tr>
            {/each}
        </tbody>
    </table>
</div>
{/if}
<style>
    th{
        font-weight: normal;
        color: var(--accent-color);
    }
</style>