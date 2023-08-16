<script lang="ts">
    import { onMount } from "svelte";


    let highlightEl: HTMLDivElement | null = null;
    let inputEl: HTMLInputElement | null = null;
    onMount(()=>{
        highlightEl = document.querySelector("#highlighting");
        inputEl = document.querySelector("#solution");
    });
    
    function highlight(){
        let code = inputEl?.value || '';
        if(highlightEl?.firstElementChild){
            if(code[code.length-1] == '\n'){
                code += ' ';
            }
            highlightEl.firstElementChild.innerHTML = code.replace(new RegExp("&", "g"), "&").replace(new RegExp("<", "g"), "<");;
            window.Prism.highlightElement(highlightEl.firstElementChild);
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
            let before_tab = code.slice(0, inputEl.selectionStart || 0); 
            let after_tab = code.slice(inputEl.selectionEnd || 0, inputEl.value.length); 
            let cursor_pos = (inputEl.selectionEnd || 0) + 1; 
            inputEl.value = before_tab + "\t" + after_tab; 
            inputEl.selectionStart = cursor_pos;
            inputEl.selectionEnd = cursor_pos;
            highlight();
        }
    }
</script>

<textarea spellcheck="false" name="solution" rows=20 class="form-control" id="solution" on:scroll={sync_scroll} on:input={()=>{ highlight(); sync_scroll();}} on:keydown={check_tab} required></textarea>

<pre id="highlighting" aria-hidden="true">
  <code class="language-py" id="highlighting-content" ></code>
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
        z-index: 1;
        color: transparent;
        background: transparent;
        caret-color: white;
    }
    
    #highlighting {
        background: var(--color3);
        padding: 0.375rem 0.75rem;
        height: calc(1.5rem*20 + 0.75rem + 2*var(--bs-border-width));
        border-radius: var(--bs-border-radius);
        z-index: 0;
    }
    textarea {
        resize: none;
    }
</style>