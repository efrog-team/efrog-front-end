import { getMembers, getInfo} from "$lib/server/team.js";


export async function load({params, cookies}) {
	const teamInfo = await getInfo(params.team_name); 
    
	const members = await getMembers(params.team_name);
	const needConfirmation = !!members.find((member)=>member.member_username == cookies.get("username") && 
        !member.confirmed && !member.declined);
	return {
		teamInfo,
		members,
		me: teamInfo.owner_user_username == cookies.get("username"),
		needConfirmation,
	};
}
