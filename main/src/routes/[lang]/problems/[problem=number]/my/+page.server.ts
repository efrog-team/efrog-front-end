import { checkAuth } from "$lib/check";
import { getProblemSubmission } from "$lib/server/submission.js";

export async function load({params, cookies, url}){
	await checkAuth(cookies, url, params.lang);
	return {
		submissions: await getProblemSubmission(cookies.get("username") || "", Number(params.problem))
	};
}