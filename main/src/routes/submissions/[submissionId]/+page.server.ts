import { getSubmission, type SubmissionPublic } from '$lib/server/submission.js';
import { redirect } from '@sveltejs/kit';

export async function load({params, cookies, url}){
    let info;
    info = await getSubmission(Number(params.submissionId));
    
    if(info.author_user_username === cookies.get("username")){
        throw redirect(303, url.pathname + "/full");
    }
    return {info};
}