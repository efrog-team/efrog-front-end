import { deleteTeam, activate, deactivate } from "$lib/server/team";

export async function PUT({cookies, request, params}) {
	const { action } = await request.json();
	switch (action) {
		case "delete":
			await deleteTeam(params.team_name, cookies.get("auth") || "");
			break;
		case "activate":
			await activate(params.team_name, cookies.get("auth") || "");
			break;
		case "deactivate":
			await deactivate(params.team_name, cookies.get("auth") || "");
			break; 
	}
	return new Response(null, { status: 204 });
}
