<script>
	let currentTime = new Date();
	let greeting = '';
	export let isSuccess = false;

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

<div class="box text-center flex flex-col py-6 lg:mt-8">
	{#if isSuccess}
		<h2 class="font-bold text-3xl lg:text-4xl text-[#008480]">Thank You!</h2>
		<h1 class="font-bold text-3xl lg:text-4xl">Your Response Has Been Submitted</h1>
	{:else}
		<h2 class="font-bold text-3xl lg:text-4xl text-[#008480]">Good {greeting}!</h2>
		<h1 class="font-bold text-4xl lg:text-5xl">Please Rate Our Toilet</h1>
	{/if}
</div>
