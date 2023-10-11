import {formToObj} from '$lib/features'
import {createProblem} from '$lib/server/problems'
import {fail, redirect} from '@sveltejs/kit'

function validateFormInfo(data: {[key:string]: string}){
	if(!data["name"]?.length) throw new Error("Problem name is required");
	if(!data["statement"]) throw new Error("Statement is required");
	if(!data["input_statement"]) throw new Error("Input Format is required");
	if(!data["output_statement"]?.length) throw new Error("Output Format is required");
}

export const actions = {
	save: async ({ request, cookies, params }) => {
		const formData = formToObj(await request.formData());
		let id;
		try {
			validateFormInfo(formData);
			id = await createProblem(formData["name"], formData["statement"], formData["input_statement"], 
			formData["output_statement"], formData["notes"], Number(formData["time_restriction"]), 
			Number(formData["memory_restriction"]), !!!formData["public"], cookies.get("auth")||"");
		} catch (err: any) {
			if(err.status && err.status != 409){
				throw err;
			}
			return fail(422, {
				error: err.message || err.body?.message,
				data: formData,
			});
		}
		throw redirect(303, `/${params.lang}/editor/problems/${id}`)
	}
}