import { getSubmission, type SubmissionPublic } from '$lib/server/submission.js';
import { error, redirect } from '@sveltejs/kit';

export async function load({params, cookies, url}){
    let info;
    try {
        info = await getSubmission(Number(params.submissionId));
    } catch (err: any) {
        throw error(404, err.message);
    }
    if(info.author_user_username === cookies.get("username")){
        throw redirect(303, url.pathname + "/full");
    }
    return {info};
}