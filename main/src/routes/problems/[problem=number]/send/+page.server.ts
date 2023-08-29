import { checkAuth } from '$lib/check.js'
import { submit } from '$lib/server/submission.js'
import { redirect } from '@sveltejs/kit';

export async function load({cookies, url}){
    await checkAuth(cookies, url);
}

function getLangInfo(str: string){
    let [_, language, version] = str.match(/(.+) \((.+)\)/);
    return {language, version};
}

export const actions = {
	submit: async ({ request, cookies, params }) => {
		const formData = await request.formData();
		let {language, version} = getLangInfo(formData.get("language"));
        let submitionId = await submit(params.problem, formData.get("solution"), language, 
                version, cookies.get("auth"));

        throw redirect(303, `/submissions/${submitionId}/full`);
	}
}