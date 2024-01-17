import { getExamples, getProblem } from "$lib/server/problems.js";

export async function load({ params, cookies}) {
	return {
		examples: await getExamples(Number(params.problem), cookies.get("auth") || "")
	};
}