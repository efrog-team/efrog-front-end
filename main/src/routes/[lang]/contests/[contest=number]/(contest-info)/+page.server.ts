import { formToObj } from '$lib/features';
import { getAllProblems, getParticipantData, addParticipant } from '$lib/server/contest';
import { usersTeams } from '$lib/server/team.js';
import { fail } from '@sveltejs/kit';


export async function load({params, cookies, parent}) {
    let {contest} = await parent();
    let userInfo: Participant|null = null;
    try {
        if(cookies.get("username")) {
            userInfo = await getParticipantData(Number(params.contest), cookies.get("username")||"", cookies.get("auth") || "");
        }
    } catch (err: any) {
        if(err.status != 404) throw err;
        userInfo = null;
    } 
    let teams: Team[] = [];
    if(contest.maximum_team_members_number>1 && cookies.get("username") && !userInfo){
        teams = await usersTeams(cookies.get("username")||"", true);
    }
    return {
        problems: await getAllProblems(Number(params.contest), cookies.get("auth")||""),
        userInfo,
        userTeams: teams
    }
}

export const actions = {
    register: async ({ request, cookies, params }) => {
		const formData = formToObj(await request.formData());
		try {
            let individual = formData["type"] == "individual";
            let name = individual ? cookies.get("username")||"" : formData["team-name"];
            if(!name) throw new Error("Team name is required");
            await addParticipant(Number(params.contest), name, individual, cookies.get("auth")||"");
		} catch (err: any) {
			if(err.status && err.status != 409 && err.status != 404){
				throw err;
			}
			return fail(422, {
				error: err.message || err.body?.message,
				data: formData,
			});
		}
	},
}