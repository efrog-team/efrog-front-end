import { checkAuth } from "$lib/check.js";
import { formToObj, formatCode, getLangInfo } from "$lib/features";
import { submit } from "$lib/server/submission.js";
import { fail, redirect } from "@sveltejs/kit";

export async function load({cookies, url, params}){
	await checkAuth(cookies, url, params.lang);
}

export const actions = {
	submit: async ({ request, cookies, params }) => {
		const formData = formToObj(await request.formData());
		const {language, version} = getLangInfo(formData["language"]||"");
		let submitionId;
		try {
			submitionId = await submit(Number(params.problem), formatCode(formData["solution"]||""), language, 
				version, cookies.get("auth")||"");
		} catch (err: any) {
			if(err.status != 403) throw err;
			return fail(422, {
				error: err.body?.message,
				data: formData,
			});
		}
		throw redirect(303, `/${params.lang}/submissions/${submitionId}/full`);
	}
};