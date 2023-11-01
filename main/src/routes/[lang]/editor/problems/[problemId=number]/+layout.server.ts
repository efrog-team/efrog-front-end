import { canBeEdited, getProblem } from "$lib/server/problems";
import { error } from "@sveltejs/kit";

export async function load({params, cookies}) {
	const problem = await getProblem(Number(params.problemId), cookies.get("auth"));
	if(problem.author_user_username != cookies.get("username")) throw error(403, "Access denied");

	return { 
		problem,
		editable: await canBeEdited(Number(params.problemId), cookies.get("auth")),
		id: params.problemId
	};
}