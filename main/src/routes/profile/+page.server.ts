import { redirect } from '@sveltejs/kit';
import { checkAuth } from '$lib/check.js'

export async function load({cookies, url}) {
	let data = await checkAuth(cookies, url);
	throw redirect(303, "/users/"+data.username);
}
