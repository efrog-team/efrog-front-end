import { getExamples, getProblem } from '$lib/server/problems.js';

export async function load({ params, cookies}) {
	return {
		task: await getProblem(Number(params.task), cookies.get("auth") || ""),
		examples: await getExamples(Number(params.task), cookies.get("auth") || "")
	}
}