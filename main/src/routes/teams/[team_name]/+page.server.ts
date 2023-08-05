import { getMembers, getInfo} from "$lib/server/team.js";
import { error} from "@sveltejs/kit";


export async function load({params, cookies}) {
    let teamInfo;
    try {
        teamInfo = await getInfo(params.team_name); 
    } catch (err: any) {
        throw error(404, err.message);
    }
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
