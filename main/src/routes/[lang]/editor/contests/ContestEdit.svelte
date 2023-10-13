<script lang="ts">
    import locs from '$lib/localisation.json';

    export let editable = true;
    export let info: any = null;
    export let lang: string;

    let forTeams = !!info?.data?.maximum_team_members_number && info?.data?.maximum_team_members_number > 1;
    //let loc = locs[lang as keyof typeof locs].editor.problems.problem_edit;
</script>
<form action="?/save" method="post">
    <div class="mb-4">
        <label for="contest-name" class="form-label">Contest name</label>
        <input value={info?.data.name || null} type="text" id="contest-name" name="name" class="form-control" >
    </div>
    <div class="mb-4">
        <label for="contest-name" class="form-label">Description (optional)</label>
        <textarea rows="5" value={info?.data.description || null} id="description" name="description" class="form-control" ></textarea>
    </div>
    <hr>
    <div class="mb-4">
        <div class="row align-items-center mb-2">
            <div class="col-sm-5 col-md-3">
                <label for="start-time" class="col-form-label">Start Date</label>
            </div>
            <div class="col-sm-6 col-md-4">
                <input  type="datetime-local" name="start_time" id="start-time" class="form-control" value={info?.data.start_time || null}>
            </div>
        </div>
        <div class="row align-items-center mb-2">
            <div class="col-sm-5 col-md-3">
                <label for="end-time" class="col-form-label">End Date</label>
            </div>
            <div class="col-sm-6 col-md-4 ">
                <input type="datetime-local" name="end_time" id="end-time" class="form-control" value={info?.data.end_time || null}>
            </div>
        </div>
    </div>
    <hr>
    <div class="mb-4">
        <div class="mb-1">
            <input class="form-check-input" type="checkbox" name="public" id="public" bind:checked={forTeams}>
            <label class="form-check-label" for="public">For teams </label>
        </div>
        {#if forTeams}
        <div class="row align-items-center mb-2">
            <div class="col-sm-5 col-md-3">
                <label for="max-members" class="col-form-label">Members in team</label>
            </div>
            <div class="col-sm-6 col-md-4">
                <input value={info?.data.maximum_team_members_number || 3} type="number" step="1" min="1" name="maximum_team_members_number" id="max-members" class="form-control">
            </div>
        </div>
        {:else}
        <input type="hidden" name="maximum_team_members_number" value="1">
        {/if}
        <div class="mb-3 mt-3">
            <input class="form-check-input" type="checkbox" name="auto_confirm_participants" id="auto-confirm" checked={info?.data.auto_confirm_participants || false}>
            <label class="form-check-label" for="auto-confirm">Automatically approve all participants</label>
        </div>
    </div>
    {#if editable}
    <div class="mb-4">
        <button type="submit" class="btn btn-accent mb-2">Save</button>
        {#if info?.error}
        <div class="form-error">{info?.error}</div>
        {/if}
    </div>
    {/if}
</form>
