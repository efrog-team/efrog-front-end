<script>
	import GeneralInfo from "./GeneralInfo.svelte";

	export let data;
</script>
<svelte:head>
	<title>#{data.info.id}</title>
</svelte:head>
<GeneralInfo lang={data.lang} info={data.info}/>

