import {formToObj} from '$lib/features.ts'
import {limits} from '$lib/config.ts'
import {createProblem} from '$lib/server/problems.ts'
import {fail, redirect} from '@sveltejs/kit'

function validateFormInfo(data){
	if(!data.get("problem-name")?.length) throw new Error("Problem name is required");
	let tl = Number(data.get("time-limit"));
	if(isNaN(tl) || tl < limits.time.min || tl > limits.time.max) 
		throw new Error("Invalid Time Limit");
	let ml = Number(data.get("memory-limit"));
	if(isNaN(ml) || ml < limits.memory.min || ml > limits.memory.max) 
		throw new Error("Invalid Memory Limit");
	if(!data.get("statement")?.length) throw new Error("Statement is required");
	if(!data.get("input-format")?.length) throw new Error("Input Format  is required");
	if(!data.get("output-format")?.length) throw new Error("Output Format is required");
}

export const actions = {
	save: async ({ request, cookies, params }) => {
		const formData = await request.formData();
		let id;
		try {
			validateFormInfo(formData);
			id = await createProblem(formData.get("problem-name"), formData.get("statement"), formData.get("input-format"), 
			formData.get("output-format"), formData.get("notes"), formData.get("time-limit"), formData.get("memory-limit"), 
				!!!formData.get("public"), cookies.get("auth"));
		} catch (err) {
			if(err.status && err.status != 409){
				throw err;
			}
			return fail(422, {
				error: err.message || err.body?.message,
				data: formToObj(formData),
			});
		}
		throw redirect(303, `/editor/problems/${id}`)
	}
}