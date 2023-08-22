import { getMe } from '$lib/server/user.js';
import { redirect } from '@sveltejs/kit';

export async function load({cookies, url}) {
    if(url.searchParams.get("state") != cookies.get("state")){
        throw redirect(307, "/account/login");
    }
    cookies.delete("state", {path: "/"});

    let token, myInfo;
    try {
        token = url.searchParams.get("code") || "" // hardcode
        myInfo = await getMe(token);
    } catch (err: any) {
        throw redirect(307, "/account/login");
    }
    let back = cookies.get("back") || '/';
    cookies.delete("back", {path: "/"});
    
    cookies.set("auth", token, {path: "/", sameSite: "lax"});
    cookies.set("username", myInfo.username, {path: "/"});

    throw redirect(303, back);
}
