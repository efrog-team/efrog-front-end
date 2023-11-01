import { checkAuth } from "$lib/check.js";

export async function load({cookies, url, params}){
	return {
		author: await checkAuth(cookies, url, params.lang)
	};
}