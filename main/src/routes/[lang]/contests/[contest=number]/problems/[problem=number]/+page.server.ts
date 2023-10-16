import { getProblem } from '$lib/server/contest';

export async function load({ params, cookies}) {
    let fullProblem = await getProblem(Number(params.contest), Number(params.problem), cookies.get("auth") || "")
    return {
		problem: fullProblem,
		examples: fullProblem.test_cases
	}
}