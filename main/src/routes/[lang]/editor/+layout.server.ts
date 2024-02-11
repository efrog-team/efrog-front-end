import { checkAuth } from "$lib/check.js";
import { redirect } from "@sveltejs/kit";

export async function load({cookies, url, params}){
	try {
		const author = await checkAuth(cookies, url, params.lang);
		return {author};
	} catch (error) {
		if(!url.pathname.endsWith("/editor")){
			throw redirect(303, `/${params.lang}/editor`);
		}else{
			return {author: null};
		}
	}
}