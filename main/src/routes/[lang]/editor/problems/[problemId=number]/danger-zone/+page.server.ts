import { problemDeletable } from "$lib/server/problems.js";

export async function load({params, cookies}) {
	return {
		deletable: await problemDeletable(+params.problemId, cookies.get("auth") || ""),
	};
}