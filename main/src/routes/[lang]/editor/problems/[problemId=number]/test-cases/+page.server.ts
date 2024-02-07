import {formToObj} from "$lib/features";
import { createTestCase, updateTestCase, deleteTestCase, makeTestCaseClosed, makeTestCaseOpened, getFullProblem} from "$lib/server/problems";
import {fail} from "@sveltejs/kit";

export async function load({params, cookies}) {
	return {
		full: await getFullProblem(+params.problemId, cookies.get("auth") || "")
	};
}

function validateFormInfo(data: Dictionary){
	if(!data["input"]?.length) throw new Error("Input is required");
	if(!data["output"]?.length) throw new Error("Output is required");
}

export const actions = {
	save: async ({ request, cookies, params }) => {
		const formData = formToObj(await request.formData());
		try {
			validateFormInfo(formData);
			if(Number(formData["id"]) == 0){
				await createTestCase(Number(params.problemId), formData["input"], formData["output"], 
					Number(formData["score"] || 0), !!formData["opened"], cookies.get("auth")||"");
			}else{
				await updateTestCase(Number(params.problemId), Number(formData["id"]), formData["input"],
					formData["output"], Number(formData["score"] || 0), cookies.get("auth")||"");
				if(formData["opened"]){
					await makeTestCaseOpened(Number(params.problemId), Number(formData["id"]), 
						cookies.get("auth")||"");
				}else{
					await makeTestCaseClosed(Number(params.problemId), Number(formData["id"]), 
						cookies.get("auth")||"");
				}
			}
		} catch (err: any) {
			if(err.status && err.status != 409){
				throw err;
			}
			return fail(422, {
				error: err.message || err.body?.message,
				data: formData,
				id: Number(formData["id"])
			});
		}
	},
	delete: async ({ request, cookies, params }) => {
		const formData = formToObj(await request.formData());

		await deleteTestCase(Number(params.problemId), Number(formData["id"]), cookies.get("auth")||"");
	}
};