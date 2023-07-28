import { redirect } from '@sveltejs/kit';

export function load() {
	throw redirect(307, '/tasks/1');
}
