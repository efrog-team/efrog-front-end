import { localisations } from "$lib/config.js";
import { error } from "@sveltejs/kit";

export function load({params, cookies}) {
	if(!localisations.includes(params.lang)) throw error(404, "Not Found");
	cookies.set('lang', params.lang, {path: "/"});
	return {
		lang: params.lang,
		username: cookies.get("username")
	};
}