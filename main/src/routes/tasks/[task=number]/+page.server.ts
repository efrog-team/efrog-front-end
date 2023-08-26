import { getExamples, getProblem } from '$lib/server/task.js';
import { error } from '@sveltejs/kit';

export async function load({ params, cookies}) {
	return {
		task: await getProblem(Number(params.task), cookies.get("auth")),
		examples: await getExamples(Number(params.task))
	}
}