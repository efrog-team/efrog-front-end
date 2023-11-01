import {formToObj} from "$lib/features";
import {getTestCases, createTestCase, updateTestCase, deleteTestCase, makeTestCaseClosed, makeTestCaseOpened} from "$lib/server/problems";
import {fail} from "@sveltejs/kit";

export async function load({params, cookies}) {
	return {
		testCases: await getTestCases(Number(params.problemId), cookies.get("auth")),
	};
}

function validateFormInfo(data){
	if(!data.get("input")?.length) throw new Error("Input is required");
	if(!data.get("output")?.length) throw new Error("Output is required");
}

export const actions = {
	save: async ({ request, cookies, params }) => {
		const formData = await request.formData();
		try {
			validateFormInfo(formData);
			if(formData.get("id") == 0){
				await createTestCase(Number(params.problemId), formData.get("input"), formData.get("output"), 
					Number(formData.get("score")), !!formData.get("opened"), cookies.get("auth"));
			}else{
				await updateTestCase(Number(params.problemId), Number(formData.get("id")), 
					formData.get("input"), formData.get("output"), Number(formData.get("score")), 
					cookies.get("auth"));
				if(formData.get("opened")){
					await makeTestCaseOpened(Number(params.problemId), Number(formData.get("id")), 
						cookies.get("auth"));
				}else{
					await makeTestCaseClosed(Number(params.problemId), Number(formData.get("id")), 
						cookies.get("auth"));
				}
			}
		} catch (err) {
			if(err.status && err.status != 409){
				throw err;
			}
			const data = formToObj(formData);
			data.opened = !!data.opened;
			return fail(422, {
				error: err.message || err.body?.message,
				data,
				id: Number(formData.get("id"))
			});
		}
	},
	delete: async ({ request, cookies, params }) => {
		const formData = await request.formData();

		await deleteTestCase(Number(params.problemId), Number(formData.get("id")), cookies.get("auth"));
	}
};