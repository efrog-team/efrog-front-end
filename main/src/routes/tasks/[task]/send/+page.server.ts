import { versions } from '$lib/config.js'
import { checkAuth } from '$lib/check.js'
import { submit } from '$lib/server/submission.js'
import { error, redirect } from '@sveltejs/kit';

export async function load({cookies, url}){
    await checkAuth(cookies, url);

    return {versions};
}

function getLangInfo(str: string){
    let [_, language, version] = str.match(/(.+) \((.+)\)/);
    return {language, version};
}

export const actions = {
	submit: async ({ request, cookies, params }) => {
		const formData = await request.formData();
		let {language, version} = getLangInfo(formData.get("language"));
        let submitionId;
		try {
            submitionId = await submit(params.task, formData.get("solution"), language, 
                version, cookies.get("auth"));
        } catch (err) {
            throw error(403, err.message);
        }
        throw redirect(303, `/submissions/${submitionId}/full`);
	}
}