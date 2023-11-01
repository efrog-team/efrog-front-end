import {formToObj} from "$lib/features";
import {updateProblem} from "$lib/server/problems";
import {fail} from "@sveltejs/kit";


function validateFormInfo(data: Dictionary){
	if(!data["name"]?.length) throw new Error("Problem name is required");
	if(!data["statement"]?.length) throw new Error("Statement is required");
	if(!data["input_statement"]?.length) throw new Error("Input Format is required");
	if(!data["output_statement"]?.length) throw new Error("Output Format is required");
}

export const actions = {
	save: async ({ request, cookies, params }) => {
		const formData = formToObj(await request.formData());
		try {
			validateFormInfo(formData);
			await updateProblem(Number(params.problemId), formData["name"], formData["statement"], formData["input_statement"], 
				formData["output_statement"], formData["notes"], Number(formData["time_restriction"]), Number(formData["memory_restriction"]), 
				cookies.get("auth")||"");
		} catch (err: any) {
			if(err.status && err.status != 409){
				throw err;
			}
			return fail(422, {
				error: err.message || err.body?.message,
				data: formData,
			});
		}
	}
};