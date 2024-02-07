import { formToObj, getLangInfo } from "$lib/features";
import { createChecker, deleteChecker, getChecker, updateChecker } from "$lib/server/problems";
import { fail } from "@sveltejs/kit";

export async function load ({params, cookies}){
	try{
		return{
			checker: await getChecker(Number(params.problemId), cookies.get("auth") || "")
		};
	} catch (err: any){
		if(err.status !== 404) throw err;
		return {checker: null};
	}
    
}

export const actions = {
	update: async ({request, cookies, params}) => {
		const formData = formToObj(await request.formData());
		const {language, version} = getLangInfo(formData["language"]||"");
		try {
			await updateChecker(Number(params.problemId), language, version, formData["solution"], cookies.get("auth")||"");
		} catch (err: any) {
			if(err.status && err.status != 403) throw err;
			return fail(422, {
				error: err.body?.message,
				data: formData,
			});
		}
	},
	create:  async ({request, cookies, params}) => {
		const formData = formToObj(await request.formData());
		const {language, version} = getLangInfo(formData["language"]||"");
		try {
			await createChecker(Number(params.problemId), language, version, formData["solution"], cookies.get("auth")||"");
		} catch (err: any) {
			if(err.status && err.status != 403) throw err;
			return fail(422, {
				error: err.body?.message,
				data: formData,
			});
		}
	}, 
	delete: async ({cookies, params}) => {
		await deleteChecker(Number(params.problemId), cookies.get("auth") || "");
	}
};