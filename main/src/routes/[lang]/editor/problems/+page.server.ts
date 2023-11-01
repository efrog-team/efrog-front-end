import { myProblems } from "$lib/server/problems.js";
import { formToObj } from "$lib/features.js";
import { fail, redirect } from "@sveltejs/kit";
import { getFromHub } from "$lib/hub";
import { createProblem, createTestCase } from "$lib/server/problems";

export async function load({cookies, parent}) {
	const {author} = await parent();
	return {
		problems: myProblems(author.username, cookies.get("auth") || ""),
	};
}

export const actions = {
	fromHub:  async ({ request, cookies, url}) =>{
		const formData = await request.formData();
		let problemId: number;
		try{
			if(!formData.get("problemId")) throw new Error("Problem id is required");
	
			const {task, test} = await getFromHub(Number(formData.get("problemId")), cookies.get("auth") || "");

			problemId = await createProblem(task.name, task.statement, task.input_statement, task.output_statement, 
				task.note, task.time_limit, task.memory_limit, true, cookies.get("auth") || "");

			test.forEach(async(tst) => {
				await createTestCase(problemId, tst.input, tst.output, 10, tst.status, cookies.get("auth") || "");
			});
		}catch (err: any){
			if(err.status && err.status != 409 && err.status != 404){
				throw err;
			}
			return fail(422,{
				error: err.message || err.body?.message,
				data: formToObj(formData)
			});
		}
		throw redirect(303, `${url.pathname}/${problemId}`);
	}
};