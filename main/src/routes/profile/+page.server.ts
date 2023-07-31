import { redirect } from '@sveltejs/kit';
import { getMe } from '$lib/server/user.ts'

export async function load({cookies}) {
	try {
		const data = await getMe(cookies.get("auth"));
		return data;
	} catch (error) {
		throw redirect(303, '/account/login?back=/profile');
	}

}
