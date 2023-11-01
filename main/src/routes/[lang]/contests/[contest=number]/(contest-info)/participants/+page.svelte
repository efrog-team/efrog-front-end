<script lang="ts">
	export let data;
</script>
<div class="list-group">
	{#each data.participants as participant, i}
		<li class="list-group-item list-group-item-action d-flex">
			<span class="me-3">{i+1}</span>
			<a class="me-auto" href="/{data.lang}/{participant.individual?"users":"teams"}/{participant.username_or_team_name}">
				{participant.username_or_team_name} 
				{#if !participant.individual}
					<i class="bi bi-people-fill"></i>
				{/if}
			</a>
		</li>
	{/each}
</div>