import { convertDate } from "$lib/features.js";
import { getContest, canBeEdited } from "$lib/server/contest.js";
import { error } from "@sveltejs/kit";

export async function load({params, cookies}) {
	const contest = await getContest(Number(params.contest), cookies.get("auth")||"");
	contest.start_time = convertDate(contest.start_time);
	contest.end_time = convertDate(contest.end_time);
	if(contest.author_user_username != cookies.get("username")){
		throw error(403);
	}

	return { 
		contest,
		editable: await canBeEdited(Number(params.contest), cookies.get("auth") || ""),
		id: params.contest
	};
}