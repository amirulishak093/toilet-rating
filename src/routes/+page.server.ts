import type { Actions } from '@sveltejs/kit';
import type { RequestEvent } from './$types';


export function load(event: RequestEvent) {
	const params = event.url.searchParams

	const site = params.get('site');
	const area = params.get('area')

	return {site, area}
}

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		const rating = formData.get('rating');
		const site =  String(formData.get('site')).toUpperCase();
		const area =  String(formData.get('area')).toUpperCase();

		try {
			const prefilledLink = `https://docs.google.com/forms/d/e/1FAIpQLSdKvFtTBo5LsiGnUcuru6XqnkbO_vbx4H5IJWH2nW-LeZuOZA/formResponse?usp=pp_url&entry.1351215600=${rating}&entry.647138747=${site}&entry.353172185=${area}`

			await fetch(prefilledLink);

			return {
				success: true,
				status: 'Form is submitted'
			};
		} catch (error) {
			console.log(error);

			return {
				error,
				rating
			};
		}
	}
};
