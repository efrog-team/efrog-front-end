import { checkAuth } from '$lib/check.js';
import { getMySubmission } from '$lib/server/submission.js';

export async function load({params, cookies, url}){
    await checkAuth(cookies, url, params.lang);
    let {body} = await getMySubmission(Number(params.submissionId), cookies.get("auth") || '');
    return {info: body};
}