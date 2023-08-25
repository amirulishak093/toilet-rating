<script>
	import { applyAction, enhance } from '$app/forms';
	import EmojiContainer from '$lib/components/EmojiContainer.svelte';
	import Header from '$lib/components/Header.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { Icon, ArrowLongUp } from 'svelte-hero-icons';

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

	let active = false;

onMount(() => {
	window.addEventListener('scroll', handleScroll);

	return () => {
		window.removeEventListener('scroll', handleScroll);
	};
});

function handleScroll() {
	active = window.scrollY > 300;
}

function scrollToTop() {
	window.scrollTo({
		top: 0,
		behavior: 'smooth'
	});
}
</script>

<div class="relative min-h-screen bg-[#FFFBD8]">
	<Header />

	<div class="box text-center flex flex-col py-6 lg:mt-8">
		{#if form?.success}
			<h2 class="font-bold text-3xl lg:text-4xl text-[#008480]">Thank You!</h2>
			<h1 class="font-bold text-4xl lg:text-5xl">Your Response Has Been Submitted</h1>
		{:else}
			<h2 class="font-bold text-3xl lg:text-4xl text-[#008480]">Good {greeting}!</h2>
			<h1 class="font-bold text-4xl lg:text-5xl">Please Rate Our Toilet</h1>
		{/if}
	</div>

	<div class="mt-2 lg:mt-12">
		{#if loading}<Spinner />
		{:else if form?.success}
		<div class="flex flex-col items-center gap-y-12 sm:gap-y-20 pb-12">
			<img alt="Thumbs up" class="w-36 sm:w-52" src="/images/thumbs-up.png" />
			<a href="https://www.medivest.com.my/" class="flex gap-x-2 items-center border border-[#008480] px-4 py-2 rounded-full hover:scale-105 transition-all">
				<img alt="Logo" class="w-5 sm:w-7" src="/images/logo2.png" />
				<span class="text-[#008480] text-sm sm:text-base font-semibold">medivest.com.my</span>
			</a>
			
		</div>

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

{#if active}
<button
	class="fixed bottom-8 right-4 p-3 bg-black text-white rounded opacity-30 z-[1003]"
	on:click={scrollToTop}
	transition:fade={{ duration: 150 }}
>
	<Icon class="w-6" src={ArrowLongUp} />
</button>
{/if}
