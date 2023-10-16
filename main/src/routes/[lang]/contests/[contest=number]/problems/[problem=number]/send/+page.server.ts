import { getLangInfo } from '$lib/features';
import { submit } from '$lib/server/contest'
import { redirect } from '@sveltejs/kit';

export const actions = {
	submit: async ({ request, cookies, params }) => {
		const formData = await request.formData();
		let {language, version} = getLangInfo(formData.get("language") as string);
        let submitionId = await submit(Number(params.contest), Number(params.problem), 
        formData.get("solution") as string || "", language, version, cookies.get("auth") || "");

        throw redirect(303, `/${params.lang}/contests/${params.contest}/submissions/${submitionId}`);
	}
}