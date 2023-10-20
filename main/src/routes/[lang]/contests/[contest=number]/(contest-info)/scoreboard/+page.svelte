<script lang="ts">
    export let data;

    let problemNumber: {[key:number]: number} = {}
    data.problems.forEach((problem, i) => problemNumber[problem.id] = i);
    data.scoreboard.forEach(result => result.problems.sort((a,b)=> problemNumber[a.id]-problemNumber[b.id]));
</script>
<div class="mb-5">
    <table class="table-dark table table-hover table table-borderless">
        <thead>
            <tr>
                <th>Participant</th>
                <th>Total</th>
                {#each data.problems as problem, i}
                    <th>
                        <a href="/{data.lang}/contests/{data.contest.id}/problems/{problem.id}">
                            {String.fromCharCode('A'.charCodeAt(0) + i)}
                        </a>
                    </th>
                {/each}
            </tr>
        </thead>
        <tbody>
            {#each data.scoreboard as result}
            <tr>
                <td>
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
<style>
    th{
        font-weight: normal;
        color: var(--accent-color);
    }
</style>