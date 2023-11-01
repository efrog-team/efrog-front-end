import { getParticipants } from "$lib/server/contest";


export async function load({params, cookies}) {
	let participants = await getParticipants(Number(params.contest), cookies.get("auth")||"");
	participants = participants.filter((p)=>p.author_confirmed && p.participant_confirmed);
	return {
		participants
	};
}