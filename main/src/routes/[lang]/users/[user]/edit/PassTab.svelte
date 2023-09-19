<script lang="ts">
    import locs from '$lib/localisation.json'

    export let form: any;
    export let lang: string;

    let loc = locs[lang as keyof typeof locs].user.edit;

    let passVisible = false;
    let passNewVisible = false;
    let passRepeatVisible = false;
</script>

<h4>{loc.pass_header}</h4>
<div>
    <form action="?/password" method="post" novalidate>
        <div class="mb-3">
            <label for="cur-pass" class="form-label">{loc.current_pass}</label>
            <div class="input-group">
                <input type={passVisible ? "text":"password"} class="form-control" id="cur-pass" name="curPass">
                <button class="input-group-text" on:click|preventDefault={()=>{passVisible = !passVisible}}>
                    <i class="bi-eye{passVisible ? '-slash': ''}"></i>
                </button>
            </div>
        </div>
        <div class="mb-3">
            <label for="new-pass" class="form-label">{loc.new_pass}</label>
            <div class="input-group">
                <input type={passNewVisible ? "text":"password"} class="form-control" id="new-pass" name="newPass">
                <button class="input-group-text" on:click|preventDefault={()=>{passNewVisible = !passNewVisible}}>
                    <i class="bi-eye{passVisible ? '-slash': ''}"></i>
                </button>
            </div>
        </div>
        <div class="mb-4">
            <label for="repeat-pass" class="form-label">{loc.repeat_pass}</label>
            <div class="input-group">
                <input type={passRepeatVisible ? "text":"password"} class="form-control" id="repeat-pass" name="repeatPass">
                <button class="input-group-text" on:click|preventDefault={()=>{passRepeatVisible = !passRepeatVisible}}>
                    <i class="bi-eye{passVisible ? '-slash': ''}"></i>
                </button>
            </div>
        </div>
        {#if form?.error}
            <div class="form-error form-text mb-3">{form.error}</div>
        {/if}
        <div class="mb-3">
            <button type="submit" class="btn btn-accent">{loc.save}</button>
        </div>
    </form>
</div>