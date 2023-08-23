<script lang="ts">
	export let label = '';
	export let rating: number;
	export let image = '';
</script>


<button
name="rating"
type="submit"
value={rating} class="group bg-white flex flex-col rounded-lg shadow-xl py-4 gap-y-4 border w-full max-w-xs">
	<div class="mx-auto"><img alt="Very poor" class="w-36 group-hover:scale-105 transition-transform" src="/images/{image}" /></div>
	<div class="mx-auto">
		<div
			class="px-8 py-2 border rounded-full transition-all group-hover:bg-[#008480] group-hover:text-white group-hover:scale-110"
			>{label}</div
		>
	</div>
</button>
