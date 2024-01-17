import { getProblem } from "$lib/server/problems";

export async function load({params, cookies}) {
	return {
		problem: await getProblem(Number(params.problem), cookies.get("auth") || "")
	};
}