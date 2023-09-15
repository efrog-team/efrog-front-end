import { getExamples, getProblem } from '$lib/server/problems.js';

export async function load({ params, cookies}) {
	return {
		problem: await getProblem(Number(params.problem), cookies.get("auth") || ""),
		examples: await getExamples(Number(params.problem), cookies.get("auth") || "")
	}
}