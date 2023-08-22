import { redirect } from '@sveltejs/kit';

export async function load({cookies, url}){
    cookies.delete("auth", { path: '/' });
    cookies.delete("username", { path: '/' });
    throw redirect(303, url.searchParams.get("back") || "/");
}
