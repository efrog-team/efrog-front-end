import { error } from '@sveltejs/kit';
import { tasks } from './data.js';

export function load({ params }) {
	const task = tasks.find((post) => post.id === params.task);

	if (!task) throw error(404);

	return { task };
}