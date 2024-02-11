import { localisations } from "$lib/config.js";
import { redirect } from "@sveltejs/kit";

export function GET({cookies}) {
	const lang = localisations.includes(cookies.get("lang")||"") ? cookies.get("lang") as string : "uk";
	throw redirect(302, `/${lang}/problems`);
}
