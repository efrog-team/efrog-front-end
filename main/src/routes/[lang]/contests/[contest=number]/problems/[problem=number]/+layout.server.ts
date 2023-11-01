import { getContest } from "$lib/server/contest.js";
import { error } from "@sveltejs/kit";

export async function load({ cookies, params}) {
	const contest = await getContest(Number(params.contest), cookies.get("auth") || "");
	if(contest.status == "unstarted") throw error(403, "Access denied");
	return {contest};
}