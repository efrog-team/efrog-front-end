import { redirect, type Cookies } from '@sveltejs/kit';
import { getMe } from '$lib/server/user.js'

export async function checkAuth(cookies: Cookies, url:URL){
    try {
        return await getMe(cookies.get("auth") || "");
	} catch (error) {
		cookies.delete("username");
        cookies.delete("auth");
		throw redirect(303, '/account/login?back='+url.pathname);
	}
}