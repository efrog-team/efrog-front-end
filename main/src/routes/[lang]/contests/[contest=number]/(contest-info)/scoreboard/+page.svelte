<script lang="ts">
	import locs from "$lib/localisation.json";
	export let data;

	let loc = locs[data.lang as keyof typeof locs].contests.contest.scoreboard;

	data.scoreboard.participants.forEach(result => result.problems.sort((a,b)=> a.id - b.id));

	let positions: number[] = [];
	for(let i=0; i<data.scoreboard.participants.length; i++){
		positions.push(i==0 || Number(data.scoreboard.participants[i-1].total_score)!=Number(data.scoreboard.participants[i].total_score) ?
			i+1 : positions.at(-1) as number);
	}
</script>
<div class="mb-2">
	<em>
		{#if data.contest.only_count_solved_or_not}
			{loc.full_scoring} ({loc.time_penalty} - {data.contest.time_penalty_coefficient}, {loc.wrong_penalty} - {data.contest.wrong_attempt_penalty}) 
		{:else}
			{loc.partial_scoring} {data.contest.count_scores_as_percentages ? `(${loc.scale_score})`: ""}
		{/if}
	</em>
</div>
{#if data.scoreboard.participants.length}
	<div class="mb-5">
		<table class="table-dark table table-hover table table-responsive">
			<thead>
				<tr>
					<th class="ps-3"># {loc.participant}</th>
					<th class="text-center">{loc.total}</th>
					{#each data.scoreboard.participants[0].problems as problem, i}
						<th class="text-center">
							<a href="/{data.lang}/contests/{data.contest.id}/problems/{problem.id}">
								{String.fromCharCode("A".charCodeAt(0) + i)}
							</a>
						</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each data.scoreboard.participants as result, i}
					<tr>
						<td class="ps-3">
							<span class="me-1">{positions[i]}.</span>
							<a class="me-auto" href="/{data.lang}/{result.individual?"users":"teams"}/{result.username_or_team_name}">
								{result.username_or_team_name} 
								{#if !result.individual}
									<i class="bi bi-people-fill"></i>
								{/if}
							</a>
						</td>
						<td class="text-center">
							{#if data.contest.only_count_solved_or_not}
								<div class="text-success">{result.total_score}</div>
								<div>{result.total_penalty_score}</div>
							{:else}		
								{result.total_score!==null?result.total_score: "-"}				
							{/if}
						</td>
						{#each result.problems as problem}
							{#if data.contest.only_count_solved_or_not}
								<td class="text-center">
									{#if problem.solved}
										<div class="text-success">+{problem.attempts > 1 ? problem.attempts-1 :  ""}</div>
										<div>{`${Math.floor(problem.penalty_minutes/60)}`.padStart(2, "0")}:{String(problem.penalty_minutes%60).padStart(2, "0")}</div>
									{:else}
										-{problem.attempts || ""}
									{/if}
								</td>
							{:else}						
								<td class={problem.solved ? "text-success" : ""}>{problem.best_score!==null?problem.best_score: "-"}</td>
							{/if}
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
	td{
		vertical-align: middle;
	}
</style>