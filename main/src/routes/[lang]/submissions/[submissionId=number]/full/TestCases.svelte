<script lang="ts">
    import { verdictIcon } from '$lib/icons';
    import locs from '$lib/localisation.json';

    export let info: SubmissionPrivate;
    export let lang: string;

    let loc = locs[lang as keyof typeof locs].submissions.test_cases;

    $: total = {
        time: info.results?.reduce((acc, cur) => Math.max(acc, cur.time_taken), 0),
        cpu: info.results?.reduce((acc, cur) => Math.max(acc, cur.cpu_time_taken), 0),
        vMemory: info.results?.reduce((acc, cur) => Math.max(acc, cur.virtual_memory_taken), 0),
        pMemory: info.results?.reduce((acc, cur) => Math.max(acc, cur.physical_memory_taken), 0),
        score: info.results?.reduce((acc, cur) => acc + (cur.verdict_text == "Correct Answer" ? cur.test_case_score : 0), 0)
    }

</script>

<div class="mb-3 d-flex">
    <h4 class="me-auto">{loc.details}</h4>
    {#if info.checked}
    <h4 class="header">{info.correct_score}/{info.total_score}</h4>
    {/if}
</div>
<div class="mb-5 ">
    <table class="table-dark table table-hover table table-borderless table-responsive">
        <thead>
            <tr>
                <th class="header ps-3">#</th>
                <th class="header">{loc.verdict}</th>
                <th class="header">{loc.time}</th>
                <th class="header">{loc.cpu}</th>
                <th class="header">{loc.v_memory}</th>
                <th class="header">{loc.p_memory}</th>
                <th class="header">{loc.score}</th>
            </tr>
        </thead>
        <tbody>
            {#each info.results || [] as res, i}
            <tr>
                <td class="ps-3">{i+1}</td>
                <td><i class="bi me-2 {verdictIcon[res.verdict_text]}"></i> {res.verdict_text}</td>
                <td>{res.time_taken} {loc.ms}</td>
                <td>{res.cpu_time_taken} {loc.ms}</td>
                <td>{(res.virtual_memory_taken / 1000).toFixed(2)} {loc.mb}</td>
                <td>{(res.physical_memory_taken / 1000).toFixed(2)} {loc.mb}</td>
                <td>{res.verdict_text == "Correct Answer" ? res.test_case_score : 0}/{res.test_case_score}</td>
              </tr>
            {/each}
        </tbody>
        <tfoot>
            <tr>
                <td></td>
                <td></td>
                <th>{total.time} {loc.ms}</th>
                <th>{total.cpu} {loc.ms}</th>
                <th>{(total.vMemory / 1000).toFixed(2)} {loc.mb}</th>
                <th>{(total.pMemory / 1000).toFixed(2)} {loc.mb}</th>
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