export async function load({cookies, parent}) {
	const {members, teamInfo} = await parent();
	const needConfirmation = !!members.find((member)=>member.member_username == cookies.get("username") && 
        !member.confirmed && !member.declined);
	return {
		members,
		me: teamInfo.owner_user_username == cookies.get("username"),
		needConfirmation,
	};
}
