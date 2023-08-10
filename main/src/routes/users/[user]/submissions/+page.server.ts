import { error } from '@sveltejs/kit';
import { getUsersSubmission, type SubmissionPublic } from '$lib/server/submission.js';

export async function load({params}){
    try {
        console.log(await getUsersSubmission(params.user))
        return {
            username: params.user,
            submissions: await getUsersSubmission(params.user)
        }
    } catch (err: any) {
        throw error(403, err.message);
    }
}