import { getInfo, getMembers } from "$lib/server/team";

export async function load({params}) {
	return {
		teamInfo: await getInfo(params.team_name),
		members: await getMembers(params.team_name),
	};
}