import { formToObj } from '$lib/features';
import { getAllProblems, addProblem, deleteProblem } from '$lib/server/contest.js';
import { fail } from '@sveltejs/kit';

export async function load({params, cookies}) {
	return { 
		problems: getAllProblems(Number(params.contest), cookies.get("auth") || "")
	 };
}


export const actions = {
	add: async ({ request, cookies, params }) => {
		const formData = formToObj(await request.formData());
		let id;
		try {
            if(!formData["problemId"]) throw Error("ProblemId is required")
			await addProblem(Number(params.contest), Number(formData["problemId"]), cookies.get("auth")||"");
		} catch (err: any) {
			if(err.status && err.status != 409 && err.status != 404 && err.status != 403){
				throw err;
			}
			return fail(422, {
				error: err.message || err.body?.message,
				data: formData,
			});
		}
	},
	delete: async ({request, cookies, params}) =>{
		const formData = formToObj(await request.formData());
		await deleteProblem(Number(params.contest), Number(formData["problemId"]), cookies.get("auth")||"");
	}
}