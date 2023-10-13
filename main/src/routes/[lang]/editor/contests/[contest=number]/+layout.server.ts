import { convertDate } from '$lib/features.js';
import { getCompetition, canBeEdited } from '$lib/server/contest.js';

export async function load({params, cookies}) {
	let competition = await getCompetition(Number(params.contest), cookies.get("auth")||"");
	competition.start_time = convertDate(competition.start_time);
	competition.end_time = convertDate(competition.end_time);

	return { 
		competition,
		editable: await canBeEdited(Number(params.contest), cookies.get("auth") || ""),
		id: params.contest
	 };
}