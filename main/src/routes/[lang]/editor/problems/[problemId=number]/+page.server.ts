import {formToObj} from "$lib/features";
import {updateProblem} from "$lib/server/problems";
import {fail} from "@sveltejs/kit";


function validateFormInfo(data){
	if(!data.get("name")?.length) throw new Error("Problem name is required");
	if(!data.get("statement")?.length) throw new Error("Statement is required");
	if(!data.get("input_statement")?.length) throw new Error("Input Format is required");
	if(!data.get("output_statement")?.length) throw new Error("Output Format is required");
}

export const actions = {
	save: async ({ request, cookies, params }) => {
		const formData = await request.formData();
		try {
			validateFormInfo(formData);
			await updateProblem(Number(params.problemId), formData.get("name"), formData.get("statement"), formData.get("input_statement"), 
				formData.get("output_statement"), formData.get("notes"), formData.get("time_restriction"), formData.get("memory_restriction"), 
				cookies.get("auth"));
		} catch (err: any) {
			if(err.status && err.status != 409){
				throw err;
			}
			return fail(422, {
				error: err.message || err.body?.message,
				data: formToObj(formData),
			});
		}
	}
};