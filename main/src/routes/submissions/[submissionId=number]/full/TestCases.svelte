<script lang="ts">
    import type {SubmissionPrivate} from '$lib/server/submission'
    import { verdictIcon } from '$lib/config';
    export let info: SubmissionPrivate;

    $: total = {
        time: info.results?.reduce((acc, cur) => Math.max(acc, cur.time_taken), 0),
        cpu: info.results?.reduce((acc, cur) => Math.max(acc, cur.cpu_time_taken), 0),
        memory: info.results?.reduce((acc, cur) => Math.max(acc, cur.memory_taken), 0),
        score: info.results?.reduce((acc, cur) => acc + (cur.verdict_text == "Correct Answer" ? cur.test_case_score : 0), 0)
    }

</script>

<div class="mb-3 d-flex">
    <h4 class="me-auto">Details</h4>
    {#if info.checked}
    <h4 class="header">{info.correct_score}/{info.total_score}</h4>
    {/if}
</div>
<div class="mb-5 ">
    <table class="table-dark table table-hover table table-borderless">
        <thead>
            <tr>
                <th class="header ps-3">#</th>
                <th class="header">Verdict</th>
                <th class="header">Time</th>
                <th class="header">CPU</th>
                <th class="header">Memory</th>
                <th class="header">Score</th>
            </tr>
        </thead>
        <tbody>
            {#each info.results || [] as res, i}
            <tr>
                <td class="ps-3">{i+1}</td>
                <td><i class="bi me-2 {verdictIcon[res.verdict_text]}"></i> {res.verdict_text}</td>
                <td>{res.time_taken} ms</td>
                <td>{res.cpu_time_taken} ms</td>
                <td>{(res.memory_taken / 1000).toFixed(2)} MB</td>
                <td>{res.test_case_score}</td>
              </tr>
            {/each}
        </tbody>
        <tfoot>
            <tr>
                <td></td>
                <td></td>
                <th>{total.time} ms</th>
                <th>{total.cpu} ms</th>
                <th>{(total.memory/1000).toFixed(2)} MB</th>
                <th>{total.score}</th>
            </tr>
        </tfoot>
    </table>
</div>
<style>
    th{
        color:var(--accent-color)
    }
</style>