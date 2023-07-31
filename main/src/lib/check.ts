import { redirect, type Cookies } from '@sveltejs/kit';
import { getMe } from '$lib/server/user.js'

export async function checkAuth(cookies: Cookies, url:URL){
    try {
		const data = await getMe(cookies.get("auth") || "");
        return data;
	} catch (error) {
		cookies.delete("username");
        cookies.delete("auth");
		throw redirect(303, '/account/login?back='+url.pathname);
	}
}