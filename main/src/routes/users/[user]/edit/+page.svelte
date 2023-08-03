<script lang="ts">
    import InfoTab from "./InfoTab.svelte";
    import PassTab from "./PassTab.svelte";

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
            <InfoTab data={data} form={form}></InfoTab>
        </div>
        <div class="tab-pane fade {activeTab == 'pass' ? 'show active' : ''}" id="pass-tab" role="tabpanel" tabindex="0">
            <PassTab form={form}></PassTab>
        </div>
    </div>
</div>

<style>
    .nav-pills .nav-link.active{
        background-color: var(--color2);
    }
</style>