import { checkAuth } from "$lib/check.js";
import { getIndividualSubmisions, getTeamSubmisions, getParticipantData } from "$lib/server/contest";

export async function load({params, cookies, url}){
	await checkAuth(cookies, url, params.lang);
	const userInfo = await getParticipantData(Number(params.contest), cookies.get("username")||"", cookies.get("auth") || "");
	let submissions;
	if(userInfo.individual){
		submissions = await getIndividualSubmisions(Number(params.contest), Number(params.problem), 
			userInfo.username_or_team_name, cookies.get("auth") || "");
	}else{
		submissions = getTeamSubmisions(Number(params.contest), Number(params.problem), 
			userInfo.username_or_team_name, cookies.get("auth") || "");
	}
	return {
		submissions 
	};
}