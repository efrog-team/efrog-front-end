import {formToObj} from '$lib/features.ts'
import {limits} from '$lib/config.ts'
import {updateProblem, getProblem, canBeEdited} from '$lib/server/problems.ts'
import {fail, redirect} from '@sveltejs/kit'

export async function load({params, cookies}) {
	return {
		id: params.problemId,
		problem: await getProblem(Number(params.problemId), cookies.get("auth")),
		editable: await canBeEdited(Number(params.problemId), cookies.get("auth"))
	}
}

function validateFormInfo(data){
	if(!data.get("name")?.length) throw new Error("Problem name is required");
	let tl = Number(data.get("time_restriction"));
	if(isNaN(tl) || tl < limits.time.min || tl > limits.time.max) 
		throw new Error("Invalid Time Limit");
	let ml = Number(data.get("memory_restriction"));
	if(isNaN(ml) || ml < limits.memory.min || ml > limits.memory.max) 
		throw new Error("Invalid Memory Limit");
	if(!data.get("statement")?.length) throw new Error("Statement is required");
	if(!data.get("input_statement")?.length) throw new Error("Input Format  is required");
	if(!data.get("output_statement")?.length) throw new Error("Output Format is required");
}

export const actions = {
	save: async ({ request, cookies, params }) => {
		const formData = await request.formData();
		let id;
		try {
			validateFormInfo(formData);
			await updateProblem(params.problemId, formData.get("name"), formData.get("statement"), formData.get("input_statement"), 
			formData.get("output_statement"), formData.get("notes"), formData.get("time_restriction"), formData.get("memory_restriction"), 
				cookies.get("auth"));
		} catch (err) {
			if(err.status && err.status != 409){
				throw err;
			}
			return fail(422, {
				error: err.message || err.body?.message,
				data: formToObj(formData),
			});
		}
	}
}