<script lang="ts">
    import locs from "$lib/localisation.json";
    export let data;
    export let form;

    let loc = locs[data.lang as keyof typeof locs].question;
</script>
<div class="mb-3 mt-2">
	<h2 class="header">{loc.header}</h2>
</div>
<p>{loc.owerview}</p> 
<form action="?/submit" method="post">
    <div class="mb-3">
        <label for="email" class="form-label">{loc.email}</label>
        <input class="form-control" type="text" id="email" name="email" value="{form?.data.email || data.email}">    
    </div>
    <div class="mb-3">
        <label for="topic" class="form-label">{loc.topic}</label>
        <input type="text"  class="form-control" id="topic" name="topic" value="{form?.data.topic || ''}">
    </div>
    <div class="mb-4">
        <label for="question" class="form-label">{loc.question}</label>
        <textarea name="question" id="question" rows=15 class="form-control" value="{form?.data.question || ''}"></textarea>
    </div>
    <div class="mb-4">
        <button type="submit" class="btn btn-accent">{loc.submit}</button>
    </div>
</form>