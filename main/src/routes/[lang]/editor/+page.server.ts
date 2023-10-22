import { redirect } from '@sveltejs/kit';

export function load({cookies, url, params}){
    console.log("redirect")
    throw redirect(303, `/${params.lang}/editor/problems`)
}