import { redirect, type Cookies } from "@sveltejs/kit";
import { getMe } from "$lib/server/user.js";

export async function checkAuth(cookies: Cookies, url:URL, lang: string){
	try {
		const info = await getMe(cookies.get("auth") || "");
		if(info.username != cookies.get("username")) throw new Error();
		return info;
	} catch (error) {
		cookies.delete("username", {path: "/"});
		cookies.delete("auth", {path: "/"});
		throw redirect(307, `/${lang}/account/login?back=${url.pathname}`);
	}
}
