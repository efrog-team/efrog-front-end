<script lang="ts">
    import { onMount } from "svelte";
    import { prismLang } from "$lib/config";

    export let lang: string;
    $: langCode = prismLang[lang];

    let highlightEl: HTMLDivElement | null = null;
    let inputEl: HTMLInputElement | null = null;
    onMount(()=>{
        highlightEl = document.querySelector("#highlighting");
        inputEl = document.querySelector("#solution");
        highlight();
    });
    
    function highlight(){
        let code = inputEl?.value || '';
        if(highlightEl?.firstElementChild){
            if(code[code.length-1] == '\n'){
                code += ' ';
            }
            highlightEl.firstElementChild.innerHTML = code.replaceAll("<", "&lt;");
            window.Prism.highlightElement(highlightEl.firstElementChild);
            sync_scroll();
        }
    }

    function sync_scroll(){
        if(highlightEl && inputEl){
            highlightEl.scrollTop = inputEl.scrollTop;
            highlightEl.scrollLeft = inputEl.scrollLeft;
        }
    }

    function check_tab(event: KeyboardEvent){
        let code = inputEl?.value || '';
        if(event.key == "Tab" && inputEl) {
            event.preventDefault(); 
            let beforeTab = code.slice(0, inputEl.selectionStart || 0); 
            let afterTab = code.slice(inputEl.selectionEnd || 0, inputEl.value.length); 
            let cursorPos = (inputEl.selectionEnd || 0) + 1; 
            inputEl.value = beforeTab + "\t" + afterTab; 
            inputEl.selectionStart = cursorPos;
            inputEl.selectionEnd = cursorPos;
            highlight();
        }
    }
</script>

<textarea spellcheck="false" name="solution" rows=20 class="form-control" id="solution" on:scroll={sync_scroll} on:input={highlight} on:focus={highlight} on:keydown={check_tab} required></textarea>

<pre class="backing" id="highlighting" aria-hidden="true">
  <code class={langCode ? `language-${langCode}` : ''} id="highlighting-content" ></code>
</pre>
<style>
    #solution, #highlighting {
        font-family: monospace;
        white-space: nowrap;
        overflow: auto;
        tab-size: 4;
    }
    #highlighting, code{
        font-size: 1rem;
        line-height: 1.5;
    }
    #solution{
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        color: transparent;
        background: transparent;
        caret-color: var(--font-color);
    }
    
    #highlighting {
        width: 100%;
        padding: 0.375rem 0.75rem;
        margin-top: 0;
        height: calc(1.5rem*20 + 0.75rem + 2*var(--bs-border-width));
        z-index: 0;
        user-select: none;
    }
    textarea {
        resize: none;
    }
</style>