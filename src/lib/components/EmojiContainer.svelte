<script lang="ts">
	export let label = '';
	export let rating: number;
	export let image = '';
</script>

<div class="bg-white flex flex-col rounded-lg shadow-xl py-4 gap-y-4 border w-full max-w-xs">
	<div class="mx-auto"><img alt="Very poor" class="w-36" src="/images/{image}" /></div>
	<div class="mx-auto">
		<button
			name="rating"
			type="submit"
			value={rating}
			class="px-8 py-2 border rounded-full transition-all hover:bg-[#008480] hover:text-white hover:scale-110"
			>{label}</button
		>
	</div>
</div>
