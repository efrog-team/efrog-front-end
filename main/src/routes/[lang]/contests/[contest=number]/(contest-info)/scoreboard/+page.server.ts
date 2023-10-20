import { getScoreboard, getAllProblems } from '$lib/server/contest';

export async function load({params, cookies}) {
    return {
        scoreboard: await getScoreboard(Number(params.contest), cookies.get("auth") || ""),
        problems: await getAllProblems(Number(params.contest), cookies.get("auth") || "")
    }
}