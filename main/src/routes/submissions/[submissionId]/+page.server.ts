import { getSubmission } from '$lib/server/submission.js';
import { error, fail, redirect } from '@sveltejs/kit';

export async function load({params, cookies, url}){
    try {
        //let info = await getSubmission(Number(params.submissionId));
        // if(info.author_user_username === cookies.get("username")){
        //     throw redirect(303, url.pathname + "/full");
        // }
        //console.log(info);
        //return {info};
    } catch (err: any) {
        throw error(403, err.message);
    }
}