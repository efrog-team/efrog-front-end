<script lang="ts">
    import { limits } from "$lib/config";
    import locs from '$lib/localisation.json';
    
    export let data: any = {};
    export let lang: string;

    let loc = locs[lang as keyof typeof locs].editor.problems.general_info;
</script>

<div class="mb-4">
    <label for="problem-name" class="form-label">{loc.problem_name}</label>
    <input value={data.name || null} type="text" id="problem-name" name="name" class="form-control" >
</div>
<div class="mb-4">
    <div class="row align-items-center mb-2">
        <div class="col-sm-3 col-md-2">
            <label for="time-limit" class="col-form-label">{loc.time_limit}</label>
        </div>
        <div class="col-sm-9 col-md-4 ">
            <div class="input-group">
                <input value={data.time_restriction || limits.time.default} type="number" min={limits.time.min} max={limits.time.max} name="time_restriction" id="time-limit" class="form-control" aria-describedby="time-limit-help">
                <span class="input-group-text">{loc.sec}</span>
            </div>
        </div>
        <div class="col-auto">
            <span id="time-limit-help" class="form-text">{loc.between} {limits.time.min}{loc.sec} {loc.and} {limits.time.max}{loc.sec}</span>
        </div>
    </div>
    <div class="row align-items-center mb-2">
        <div class="col-sm-3 col-md-2">
            <label for="memory-limit" class="col-form-label">{loc.memory_limit}</label>
        </div>
        <div class="col-sm-9 col-md-4 ">
            <div class="input-group">
                <input value={data.memory_restriction || limits.memory.default} type="number" min={limits.memory.min} max={limits.memory.max} name="memory_restriction" id="memory-limit" class="form-control" aria-describedby="memory-limit-help">
                <span class="input-group-text">{loc.mb}</span>
            </div>
        </div>
        <div class="col-auto">
            <span id="memory-limit-help" class="form-text">{loc.between} {limits.memory.min}{loc.mb} {loc.and} {limits.memory.max}{loc.mb}</span>
        </div>
    </div>
</div>