import { checkAuth } from '$lib/check.js';
import { getMySubmission, type SubmissionPrivate } from '$lib/server/submission.js';
import { error } from '@sveltejs/kit';

export async function load({params, cookies, url}){
    try {
        await checkAuth(cookies, url);
        let {body, status} = await getMySubmission(Number(params.submissionId), cookies.get("auth") || '');
        return {info: body};
    } catch (err: any) {
        throw error(403, err.message);
    }
}