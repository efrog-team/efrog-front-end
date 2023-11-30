import { localisations } from "$lib/config.js";
import { redirect } from "@sveltejs/kit";

export function load({cookies}) {
	let lang = localisations.includes(cookies.get('lang')||"") ? cookies.get('lang') as string : 'uk';
	throw redirect(303, `/${lang}`);
}
