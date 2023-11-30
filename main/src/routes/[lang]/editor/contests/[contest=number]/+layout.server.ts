import { getContest, canBeEdited } from "$lib/server/contest.js";
import { error } from "@sveltejs/kit";

export async function load({params, cookies}) {
	const contest = await getContest(Number(params.contest), cookies.get("auth")||"");
	if(contest.author_user_username != cookies.get("username")){
		throw error(403);
	}

	return { 
		contest,
		editable: await canBeEdited(Number(params.contest), cookies.get("auth") || ""),
		id: params.contest
	};
}