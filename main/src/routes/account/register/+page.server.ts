import { randomString, getAuthParams } from '$lib/features.js';
import { redirect } from '@sveltejs/kit';
import { authUrl } from '$lib/config.js';

export async function load({cookies, url}){
    cookies.set("back", url.searchParams.get("back") || "/", {path: "/"});

    const state = randomString(8)
    cookies.set("state", state, { path: '/' });

    throw redirect(303, `${authUrl}/register?${ getAuthParams(state) }`);
}
