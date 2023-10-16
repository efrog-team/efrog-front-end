<script lang="ts">
    export let data;
</script>
<!--
<div class="mb-5 ">
    <table class="table-dark table table-hover table table-borderless">
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
-->