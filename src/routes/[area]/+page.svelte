<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { Icon, ArrowLongUp } from 'svelte-hero-icons';
	import Greeting from '$lib/components/Greeting.svelte';
	import { applyAction, enhance } from '$app/forms';
	import Rating from '$lib/components/Rating.svelte';

	export let form;
	export let data;

	let isLoading = false;
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

	{#if isLoading}<Spinner />
	{:else}
		<Greeting isSuccess={form?.success} />

		<div class="mt-2 lg:mt-12">
			{#if !form?.success}
				<form
					method="POST"
					use:enhance={() => {
						isLoading = true;
						return async ({ result }) => {
							await applyAction(result);
							isLoading = false;
						};
					}}
					class="box w-full place-items-center grid grid-cols-1 lg:grid-cols-5 gap-4 pb-12"
				>
					<Rating label="Excellent" rating={2} image="excellent.png" />
					<Rating label="Good" rating={1} image="good.png" />
					<Rating label="Average" rating={0} image="average.png" />
					<Rating label="Poor" rating={-1} image="poor.png" />
					<Rating label="Very Poor" rating={-2} image="very-poor.png" />
					<input name="area" type="hidden" value={data.area} />
				</form>
			{:else}
				<div class="flex flex-col items-center gap-y-12 sm:gap-y-20 pb-12">
					<img alt="Thumbs up" class="w-36 sm:w-52" src="/images/thumbs-up.png" />
					<a
						href="https://www.medivest.com.my/"
						class="flex gap-x-2 items-center border border-[#008480] px-4 py-2 rounded-full hover:scale-105 transition-all"
					>
						<img alt="Logo" class="w-5 sm:w-7" src="/images/logo2.png" />
						<span class="text-[#008480] text-sm sm:text-base font-medium">medivest.com.my</span>
					</a>
				</div>
			{/if}
		</div>
	{/if}
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
