<script>
	import { applyAction, enhance } from '$app/forms';
	import EmojiContainer from '$lib/components/EmojiContainer.svelte';
	import Header from '$lib/components/Header.svelte';
	import Spinner from '$lib/components/Spinner.svelte';

	export let form;

	let loading = false;
	let currentTime = new Date();
	let greeting = '';

	// Get the current hour from the current time
	let currentHour = currentTime.getHours();

	// Determine the greeting based on the current hour
	if (currentHour >= 5 && currentHour < 12) {
		greeting = 'Morning';
	} else if (currentHour >= 12 && currentHour < 18) {
		greeting = 'Afternoon';
	} else {
		greeting = 'Evening';
	}
</script>

<div class="relative min-h-screen bg-[#FFFBD8]">
	<Header />

	<div class="box text-center flex flex-col py-6 mt-8">
		{#if form?.success}
			<h2 class="font-bold text-4xl text-[#008480]">Thank You!</h2>
			<h1 class="font-bold text-5xl">Your Response Has Been Submitted</h1>
		{:else}
			<h2 class="font-bold text-4xl text-[#008480]">Good {greeting}!</h2>
			<h1 class="font-bold text-5xl">Please Rate Our Toilet</h1>
		{/if}
	</div>

	<div class="mt-12">
		{#if loading}<Spinner />
		{:else if !form?.success}
			<form
				method="POST"
				use:enhance={() => {
					loading = true;
					return async ({ result }) => {
						await applyAction(result);
						loading = false;
					};
				}}
				class="box w-full place-items-center grid grid-cols-1 lg:grid-cols-5 gap-4 pb-12"
			>
				<EmojiContainer label='Excellent' rating={2} image="excellent.png" />
				<EmojiContainer label='Good' rating={1} image="good.png" />
				<EmojiContainer label='Average' rating={0} image="average.png" />
				<EmojiContainer label='Poor' rating={-1} image="poor.png" />
				<EmojiContainer label='Very Poor' rating={-2} image="very-poor.png" />
			</form>
		{/if}
	</div>
</div>
