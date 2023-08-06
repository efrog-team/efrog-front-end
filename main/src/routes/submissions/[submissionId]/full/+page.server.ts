import { checkAuth } from '$lib/check.js';
import { getMySubmition } from '$lib/server/submission.js';
import { error, fail, redirect } from '@sveltejs/kit';

export async function load({params, cookies, url}){
    try {
        await checkAuth(cookies, url);
        let {body, status} = await getMySubmition(Number(params.submissionId), cookies.get("auth") || '');
        console.log(body, status);
        return {body}
    } catch (err: any) {
        throw error(403, err.message);
    }
}