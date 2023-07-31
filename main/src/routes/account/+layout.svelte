<div class="account-container">
    <slot />
</div>

<style global>
    :global(.header){
        color: var(--accent-color)
    }
    .account-container{
        max-width: 740px;
        margin: 0 auto;
    }
    :global(.form-box){
        background-color: var(--color1);
        border-width: 0;
        color: var(--font-color);
    }
    :global(.form-text){
        color: var(--s-text)
    }

    :global(.input-group-text){
        background-color: var(--color3);
        border-color: var(--color2);
        color: var(--font-color)
    }
    :global(.form-error){
        color: var(--error-color);
    }
</style>