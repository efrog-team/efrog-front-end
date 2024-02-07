import { redirect, type Cookies } from "@sveltejs/kit";
import { getMe } from "$lib/server/user.js";

export async function checkAuth(cookies: Cookies, url:URL, lang: string){
	try {
		const info = await getMe(cookies.get("auth") || "");
		if(info.username != cookies.get("username")) throw new Error("Invalid username");
		return info;
	} catch (error) {
		console.log(`Auth Error: ${error}, username in cookies: ${cookies.get('username')}, info username: ${cookies.get('auth')}`);
		throw redirect(307, `/${lang}/account/login?back=${url.pathname}`);
	}
}
