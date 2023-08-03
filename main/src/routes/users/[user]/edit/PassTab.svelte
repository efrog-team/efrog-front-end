<script lang="ts">
    export let form: any;

    let passVisible = false;
    let passNewVisible = false;
    let passRepeatVisible = false;
</script>

<h4>Reset password</h4>
<div>
    <form action="?/password" method="post" novalidate>
        <div class="mb-3">
            <label for="cur-pass" class="form-label">Current password</label>
            <div class="input-group">
                <input type={passVisible ? "text":"password"} class="form-control" id="cur-pass" name="curPass">
                <button class="input-group-text" on:click|preventDefault={()=>{passVisible = !passVisible}}>
                    <i class="bi-eye{passVisible ? '-slash': ''}"></i>
                </button>
            </div>
        </div>
        <div class="mb-3">
            <label for="new-pass" class="form-label">New password</label>
            <div class="input-group">
                <input type={passNewVisible ? "text":"password"} class="form-control" id="new-pass" name="newPass">
                <button class="input-group-text" on:click|preventDefault={()=>{passNewVisible = !passNewVisible}}>
                    <i class="bi-eye{passVisible ? '-slash': ''}"></i>
                </button>
            </div>
        </div>
        <div class="mb-4">
            <label for="repeat-pass" class="form-label">Repeat new password</label>
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
            <button type="submit" class="btn btn-accent">Change</button>
        </div>
    </form>
</div>