<script lang="ts">
    import { limits } from "$lib/config";
    export let data: any = {};
    export let newProblem: boolean;
</script>

<div class="mb-4">
    <label for="problem-name" class="form-label">Problem Name</label>
    <input value={data.name || null} type="text" id="problem-name" name="name" class="form-control" >
</div>
<div class="mb-4">
    <div class="row align-items-center mb-2">
        <div class="col-sm-3 col-md-2">
            <label for="time-limit" class="col-form-label">Time Limit</label>
        </div>
        <div class="col-sm-9 col-md-4 ">
            <div class="input-group">
                <input value={data.time_restriction || limits.time.default} type="number" name="time_restriction" id="time-limit" class="form-control" aria-describedby="time-limit-help">
                <span class="input-group-text">s</span>
            </div>
        </div>
        <div class="col-auto">
            <span id="time-limit-help" class="form-text">Must be between {limits.time.min}s and {limits.time.max}s</span>
        </div>
    </div>
    <div class="row align-items-center mb-2">
        <div class="col-sm-3 col-md-2">
            <label for="memory-limit" class="col-form-label">Memory Limit</label>
        </div>
        <div class="col-sm-9 col-md-4 ">
            <div class="input-group">
                <input value={data.memory_restriction || limits.memory.default} type="number" name="memory_restriction" id="memory-limit" class="form-control" aria-describedby="memory-limit-help">
                <span class="input-group-text">MB</span>
            </div>
        </div>
        <div class="col-auto">
            <span id="memory-limit-help" class="form-text">Must be between {limits.memory.min}MB and {limits.memory.max}MB</span>
        </div>
    </div>
</div>
{#if newProblem}
<div class="form-check mb-2">
    <input class="form-check-input" type="checkbox" name="public" id="public" checked={!!data.public}>
    <label class="form-check-label" for="public">Public ( visible for all users )</label>
</div>
{/if}