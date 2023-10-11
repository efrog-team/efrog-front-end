import { getCompetition, canBeEdited } from '$lib/server/contest.js';

export async function load({params, cookies}) {
	await getCompetition(Number(params.contest), cookies.get("auth")||"");
	await canBeEdited(Number(params.contest), cookies.get("auth") || "");

	return { 
		competition: await getCompetition(Number(params.contest), cookies.get("auth")||""),
		editable: await canBeEdited(Number(params.contest), cookies.get("auth") || ""),
		id: params.contest
	 };
}