import type { Actions } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

export function load({params}: RequestEvent) {
	return {area: params.area}
}

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const rating = formData.get('rating');
		const area =  String(formData.get('area')).toUpperCase();

		try {
			const prefilledLink = `https://docs.google.com/forms/d/e/1FAIpQLSe7tm5fTWg9ej3p6lUw_mBIp6r-LYKhJsBPzTV67GbZkn1Rfg/formResponse?usp=pp_url&entry.1351215600=${rating}&entry.1845614413=${area}`;

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
