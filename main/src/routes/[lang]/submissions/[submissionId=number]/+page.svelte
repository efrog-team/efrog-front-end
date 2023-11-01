<script>
	import GeneralInfo from "./GeneralInfo.svelte";

	export let data;
</script>
<GeneralInfo lang={data.lang} info={data.info}/>

