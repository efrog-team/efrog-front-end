import { getScoreboard } from "$lib/server/contest";

export async function load({params, cookies}) {
	return {
		scoreboard: await getScoreboard(Number(params.contest), cookies.get("auth") || "")
	};
}