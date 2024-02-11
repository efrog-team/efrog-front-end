import { createChecker, myProblems } from "$lib/server/problems.js";
import { formToObj, getLangInfo } from "$lib/features.js";
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
	
			const problem = await getFromHub(Number(formData.get("problemId")), cookies.get("auth") || "");

			problemId = await createProblem(problem.name, problem.statement, problem.input_statement, problem.output_statement, 
				problem.note, problem.time_limit, problem.memory_limit, true, cookies.get("auth") || "");

			problem.test.forEach(async(tst) => {
				await createTestCase(problemId, tst.input, tst.output, 10, tst.status, cookies.get("auth") || "");
			});
			if(problem.is_checker) {
				const {language, version} = getLangInfo(problem.checker_language);
				await createChecker(problemId, language, version, problem.checker_code, cookies.get("auth") || "");
			}
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