import { error } from '@sveltejs/kit';
import { getUsersSubmission, type SubmissionPublic } from '$lib/server/submission.js';

export async function load({params}){
    return {
        username: params.user,
        submissions: await getUsersSubmission(params.user)
    }
}