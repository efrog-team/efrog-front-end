<script lang="ts">
    import GeneralInfo from "../GeneralInfo.svelte";
    import TestCases from "./TestCases.svelte";

    let test1 = {
        id: 1, 
        submission_id: 2, 
        test_case_id: 1, 
        test_case_score: 0, 
        verdict_text: 'Wrong Answer', 
        verdict_details: "some error\n\t on line 4", 
        time_taken: 12, 
        cpu_time_taken: 12, 
        memory_taken: 26,

    }
    let test2 = {
        id: 1, 
        submission_id: 2, 
        test_case_id: 1, 
        test_case_score: 50, 
        verdict_text: 'Wrong Answer', 
        verdict_details: 'some text', 
        time_taken: 123, 
        cpu_time_taken: 123, 
        memory_taken: 24
    }

    let subPriv = {
        id: 1,
        author_user_username: "tester",
        problem_id: 1,
        problem_name: "Some problem",
        code: "if(True):\r\n    print(4)",
        language_name: "C++ 17",
        language_version: "thh 11.4",
        time_sent: "2023-08-05 12:30:45",
        checked: true,
        correct_score: 50,
        total_score: 100,
        results: [test1, test2],
        total_verdict: "Solved"
    }

</script>
<GeneralInfo info={subPriv} />
{#if subPriv.total_verdict === "Compilation Error"}
<div class="d-flex">
    <h4 class="me-auto">Error Details</h4>
</div>
<div class="mb-5">
    <div class="mt-2 backing code p-3">{subPriv.results[0].verdict_details}</div>
</div>
{:else}
<TestCases info={subPriv} />
{/if}
<div class="mb-3">
    <h4>Code</h4>
</div>
<div class="mb-4">
    <div class="mt-2 backing code p-3">{subPriv.code}</div>
</div>
<style>
    .code{
        white-space: pre;
        font-family: monospace;
    }
</style>