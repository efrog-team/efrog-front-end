import { checkAuth } from '$lib/check.js'
import { getLangInfo } from '$lib/features';
import { submit } from '$lib/server/submission.js'
import { redirect } from '@sveltejs/kit';

export async function load({cookies, url, params}){
    await checkAuth(cookies, url, params.lang);
}

export const actions = {
	submit: async ({ request, cookies, params }) => {
		const formData = await request.formData();
		let {language, version} = getLangInfo(formData.get("language"));
        let submitionId = await submit(params.problem, formData.get("solution"), language, 
                version, cookies.get("auth"));

        throw redirect(303, `/${params.lang}/submissions/${submitionId}/full`);
	}
}