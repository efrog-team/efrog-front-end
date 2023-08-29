import {formToObj} from '$lib/features'
import {getTestCases, createTestCase, updateTestCase, deleteTestCase, makeTestCaseClosed, makeTestCaseOpened, canBeEdited} from '$lib/server/problems'
import {fail, redirect, error} from '@sveltejs/kit'

export async function load({params, cookies, parent}) {
	let {editable} = await parent();
	return {
		testCases: await getTestCases(Number(params.problemId), cookies.get("auth")),
	}
}

function validateFormInfo(data){
	if(!data.get("input")?.length) throw new Error("Input is required");
	if(!data.get("solution")?.length) throw new Error("Output is required");
}

export const actions = {
	save: async ({ request, cookies, params }) => {
		const formData = await request.formData();
		try {
			validateFormInfo(formData);
			if(formData.get("id") == 0){
                await createTestCase(Number(params.problemId), formData.get("input"), formData.get("solution"), 
                    Number(formData.get("score")), !!formData.get("opened"), cookies.get("auth"));
            }else{
                await updateTestCase(Number(params.problemId), Number(formData.get("id")), 
                    formData.get("input"), formData.get("solution"), Number(formData.get("score")), 
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
            let data = formToObj(formData);
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
}