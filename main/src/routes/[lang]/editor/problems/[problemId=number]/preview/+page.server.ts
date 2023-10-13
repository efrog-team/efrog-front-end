import { getExamples, getProblem } from '$lib/server/problems.js';

export async function load({ params, cookies}) {
	return {
		examples: await getExamples(Number(params.problemId), cookies.get("auth") || "")
	}
}