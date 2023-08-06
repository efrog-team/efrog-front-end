<script lang="ts">
    export let info: any;
</script>
<div class="mt-3 mb-5 d-flex">
    <h3 class="header me-auto">#{info.id}</h3>
    <h4><i class="bi-question-circle me-3"></i></h4>
    <h4>{info.total_verdict}</h4>
</div>
<div class="row mb-5">
    <div class="col-3">
        <div class="header mb-2">Author:</div>
        <div><a href="/users/{info.author_user_username}">{info.author_user_username}</a></div>
    </div>
    <div class="col-3">
        <div class="header mb-2">Problem:</div>
        <div><a href="/tasks/{info.problem_id}">{info.problem_name}</a></div>
    </div>
    <div class="col-3">
        <div class="header mb-2">Language:</div>
        <div>{`${info.language_name} (${info.language_version})`}</div>
    </div>
    <div class="col-3">
        <div class="header mb-2">Date:</div>
        <div>{info.time_sent}</div>
    </div>
</div>
<style>
    a:hover{
        text-decoration: underline;
    }
</style>