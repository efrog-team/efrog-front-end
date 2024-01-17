import { getContest,getProblem } from "$lib/server/contest.js";
import { error } from "@sveltejs/kit";

export async function load({ cookies, params}) {
	const contest = await getContest(Number(params.contest), cookies.get("auth") || "");
	if(contest.status == "unstarted") throw error(403, "Access denied");
	const fullProblem = await getProblem(Number(params.contest), Number(params.problem), cookies.get("auth") || "");
	return {
		contest,
		problem: fullProblem,
		examples: fullProblem.test_cases
	};
}