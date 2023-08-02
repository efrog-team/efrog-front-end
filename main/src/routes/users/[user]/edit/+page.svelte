<script lang="ts">
    export let data;
    export let form;

    let passVisible = false;
    let passRepeatVisible = false;
    let passNewVisible = false;

    let activeTab = form?.type || "info";
</script>

<div class="mb-4 mt-2">
    <h2 class="header">Edit profile</h2>
</div>
<div class="d-flex flex-column flex-sm-row align-items-sm-start">
    <div class="nav lex-row flex-sm-column nav-pills mb-3 me-5" role="tablist" aria-orientation="vertical">
      <button class="nav-link px-md-5 {activeTab == 'info' ? 'active' : ''}" on:click={()=>{form = null, activeTab="info"}} data-bs-toggle="pill" data-bs-target="#info-tab" role="tab" aria-controls="info-tab" >Personal</button>
      <button class="nav-link px-md-5 {activeTab == 'pass' ? 'active' : ''}" on:click={()=>{form = null, activeTab="pass"}} data-bs-toggle="pill" data-bs-target="#pass-tab" role="tab" aria-controls="pass-tab" >Login</button>
    </div>
    <div class="tab-content flex-grow-1">
        <div class="tab-pane fade {activeTab == 'info' ? 'show active' : ''}" id="info-tab" role="tabpanel" tabindex="0">
            <h4>Personal information</h4>
            <div class="form-box card">
                <form action="?/info" method="post" novalidate>
                    <div class="mb-3">
                        <label for="username" class="form-label">Username</label>
                        <input type="text" name="username" class="form-control" id="username" value={form?.data?.username || data.username}>
                    </div>
                    <div class="mb-3">
                        <label for="name" class="form-label">Name</label>
                        <input type="text" name="name" class="form-control" id="name" value={form?.data?.name || data.name}>
                    </div>
                    <div class="mb-4">
                        <label for="email" class="form-label">Email address</label>
                        <input type="email" name = "email" class="form-control" id="email" value={form?.data?.email || data.email}>
                    </div>
                    {#if form?.error}
                        <div class="form-error form-text mb-3">{form.error}</div>
                    {/if}
                    <div class="mb-3">
                        <button type="submit" class="btn btn-accent">Save</button>
                    </div>
                </form>
            </div>
        </div>
        <div class="tab-pane fade {activeTab == 'pass' ? 'show active' : ''}" id="pass-tab" role="tabpanel" tabindex="0">
            <h4>Reset password</h4>
            <div class="form-box card">
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
        </div>
    </div>
</div>

<style>
    .form-box{
        background-color: var(--color1);
        border-width: 0;
        color: var(--font-color);
    }
    .header{
        color: var(--accent-color)
    }

    .input-group-text{
        background-color: var(--color3);
        border-color: var(--color2);
        color: var(--font-color)
    }
    .form-error{
        color: var(--error-color);
    }
    .nav-pills .nav-link.active{
        background-color: var(--color2);
    }
</style>