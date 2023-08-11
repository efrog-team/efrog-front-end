import { getMembers, getInfo} from "$lib/server/team.js";


export async function load({params, cookies}) {
    let teamInfo = await getInfo(params.team_name); 
    
    let members = await getMembers(params.team_name);
    let needConfirmation = !!members.find((member)=>member.member_username == cookies.get("username") && 
        !member.confirmed && !member.declined);
    return {
        teamInfo,
        members,
        me: teamInfo.owner_username == cookies.get("username"),
        needConfirmation,
    }
}
