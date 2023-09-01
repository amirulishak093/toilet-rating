import type { Actions } from '@sveltejs/kit';
import type { RequestEvent } from './$types';
import { areaCodes } from '$lib/areaCodes';

export function load(event: RequestEvent) {
    const site = event.params.site;
    const area = event.params.area;

    return { site, area };
}

export const actions: Actions = {
    default: async ({ request }) => {
        const formData = await request.formData();

        const rating = formData.get('rating');
        const site = String(formData.get('site')).toUpperCase();
        const area = String(formData.get('area')).toUpperCase();

		const keys = Object.keys(areaCodes);


		for (const key of keys) {
			if (site.includes(key)) {
				const codes = areaCodes[key];
				
				if (codes.includes(area)) {
					try {
						const prefilledLink = `https://docs.google.com/forms/d/e/1FAIpQLSe7tm5fTWg9ej3p6lUw_mBIp6r-LYKhJsBPzTV67GbZkn1Rfg/formResponse?usp=pp_url&entry.1351215600=${rating}&entry.923120015=${site}&entry.1845614413=${area}`;
	
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
			}

		}
 

        return {
            error: 'Invalid input',
            rating
        };
    }
};
