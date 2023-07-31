import { redirect } from '@sveltejs/kit';

export function load({cookies}) {
	throw redirect(303, '/tasks/1');
}
