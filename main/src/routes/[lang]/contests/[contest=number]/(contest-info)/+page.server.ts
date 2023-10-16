import { getAllProblems, getParticipants } from '$lib/server/contest';


export async function load({params, cookies}) {
    let participants = await getParticipants(Number(params.contest), cookies.get("auth")||"")
    let needConfirmation = !!participants.find((p)=>p.username_or_team_name == cookies.get("username") && 
        !p.participant_confirmed && !p.participant_declined);
    return {
        problems: await getAllProblems(Number(params.contest), cookies.get("auth")||""),
        needConfirmation
    }
}