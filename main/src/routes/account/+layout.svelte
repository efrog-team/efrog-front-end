<slot />
<style global>
    :global(.header){
        color: var(--accent-color)
    }
    :global(.main-container){
        max-width: 740px!important;
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