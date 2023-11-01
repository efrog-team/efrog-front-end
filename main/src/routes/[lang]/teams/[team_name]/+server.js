import { confirmMember, declineMember } from "$lib/server/team";

export async function PUT({cookies, request, params}) {
	const { action } = await request.json();
	switch (action) {
		case "confirm":
			await confirmMember(params.team_name, cookies.get("username") || "", cookies.get("auth") || "");
			break;
		case "decline":
			await declineMember(params.team_name, cookies.get("username") || "", cookies.get("auth") || "");
			break;
	}
	return new Response(null, { status: 204 });
}
