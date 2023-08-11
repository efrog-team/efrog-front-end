import { redirect, type Cookies } from '@sveltejs/kit';
import { getMe, getToken } from '$lib/server/user.js'

export async function checkAuth(cookies: Cookies, url:URL){
    try {
        return await getMe(cookies.get("auth") || "");
	} catch (error) {
		cookies.delete("username", {path: "/"});
        cookies.delete("auth", {path: "/"});
		throw redirect(307, '/account/login?back='+url.pathname);
	}
}

export async function checkPassword(username: string, password: string, cookies: Cookies){
    let token = await getToken(username, password);
	if(cookies.get("auth") !== token){
		throw new Error("Incorrect password");
	}
}