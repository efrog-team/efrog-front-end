import { getAuthParams, randomString } from '$lib/features.js';
import { redirect } from '@sveltejs/kit';
import { authUrl } from '$lib/config.js';

export async function load({cookies, url, params}){
    cookies.set("back", url.searchParams.get("back") || "/", {path: "/"});

    const state = randomString(8)
    cookies.delete("state", { path: '/' });
    cookies.set("state", state, { path: '/' });

    throw redirect(303, `${authUrl}/${params.lang}/login?${ getAuthParams(state) }`);
}
