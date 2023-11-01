import { getContest } from "$lib/server/contest.js";


export async function load({params, cookies}) {
	return {
		contest: await getContest(Number(params.contest), cookies.get("auth")||"")
	};
}