import { checkAuth } from "$lib/check";

export async function load({cookies, url, params}){
	await checkAuth(cookies, url, params.lang);
}
