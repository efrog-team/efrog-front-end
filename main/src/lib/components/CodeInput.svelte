<script lang="ts">
	import { prismLang } from "$lib/config";
	import { onMount, tick } from "svelte";

	export let lang: string;
	export let initialCode: string = "";
	$: langCode = prismLang[lang];

	let highlightEl: HTMLPreElement;
	let inputEl: HTMLTextAreaElement;

	onMount(()=>{
		if(highlightEl) highlight();
	});

	async function highlight(){
		if(highlightEl?.firstElementChild){
			if(inputEl.value.at(-1) == "\n") {
				let selStart = inputEl.selectionStart;
				inputEl.value = inputEl.value + " ";
				inputEl.selectionStart = inputEl.selectionEnd = selStart;
			}
			await tick();
			highlightEl.firstElementChild.innerHTML = inputEl.value.replaceAll("<", "&lt;") + " ";
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

	function onKeyDown(event: KeyboardEvent){
		if(event.key == "Tab" && inputEl) {
			event.preventDefault(); 
			insertText("\t");
			onInput();
		}else if(event.key == "Enter"){
			insertText("\n"+getRowStartSpaces());
			event.preventDefault();
			onInput();
		}
	}

	function onInput(){
		correctTabs();
		highlight();
	}

	function insertText(text: string){
		let before = inputEl.value.slice(0, inputEl.selectionStart || 0); 
		let after = inputEl.value.slice(inputEl.selectionEnd || 0, inputEl.value.length); 
		let cursorPos = (inputEl.selectionStart || 0) + text.length; 
		inputEl.value = before + text + after; 
		inputEl.selectionStart = inputEl.selectionEnd = cursorPos;
		inputEl.selectionEnd = cursorPos;
	}

	function correctTabs(){
		let selStart = inputEl.selectionStart || 0;
		let lineBreak = inputEl.value.lastIndexOf("\n", selStart);
		let spaces = inputEl.value.slice(lineBreak + 1, selStart).match(/[\t ]*/)?.[0] || "";
		let newSpaces = spaces.replace(/ {4}/, "\t").replace(/ +\t/, "\t");
		inputEl.value = inputEl.value.slice(0, lineBreak + 1) + newSpaces + inputEl.value.slice(spaces.length + lineBreak + 1);	
		inputEl.selectionStart = inputEl.selectionEnd = selStart + newSpaces.length - spaces.length;
	}
	
	function getRowStartSpaces(){
		let lineBreak = inputEl.value.lastIndexOf("\n", inputEl.selectionStart-1 || -1);
		return inputEl.value.slice(lineBreak + 1, inputEl.selectionStart || 0).match(/[\t ]*/)?.[0] || "";
	}
</script>
<svelte:head>
	<link rel="stylesheet" href="/themes/prism-vsc-dark-plus.css">
	<script src="https://cdn.jsdelivr.net/npm/prismjs@v1.29.0/components/prism-core.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/prismjs@v1.29.0/plugins/autoloader/prism-autoloader.min.js"></script>
</svelte:head>
<div id="code-input">
	<textarea value={initialCode} bind:this={inputEl} spellcheck="false" name="solution" rows=16 class="form-control" id="solution"
		on:scroll={sync_scroll} on:input={onInput} on:keydown={onKeyDown} required></textarea>
	<pre bind:this={highlightEl} class="backing" id="highlighting" aria-hidden="true"><code class={langCode ? `language-${langCode}` : ""} id="highlighting-content" ></code></pre>
</div>
<style>
    #solution, #highlighting {
        font-family: monospace;
        white-space: pre;
        overflow: auto;
        tab-size: 4;
    }
    #highlighting, code{
        font-size: 1rem !important;
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
        height: calc(1.5rem*16 + 0.75rem + 2*var(--bs-border-width));
        z-index: 0;
        user-select: none;
    }
    textarea {
        resize: none;
    }
	#code-input{
        position: relative;
    }
</style>