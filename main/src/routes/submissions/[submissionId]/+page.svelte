<script>
    import GeneralInfo from "./GeneralInfo.svelte";

    let subPub1 = {
        id: 1,
        author_user_username: "tester",
        problem_id: 1,
        problem_name: "Some problem",
        language_name: "c++ 17",
        language_version: "test 12.4",
        time_sent: "2023-08-05 12:30:45",
        total_verdict: "Wrong answer"
    }
    
</script>
<GeneralInfo info={subPub1}/>

