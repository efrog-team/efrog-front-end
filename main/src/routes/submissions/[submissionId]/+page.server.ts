import { getSubmission, type SubmissionPublic } from '$lib/server/submission.js';
import { error, redirect } from '@sveltejs/kit';

let TEST = true;

let info: SubmissionPublic = {
    id: 1,
    author_user_username: "tester",
    problem_id: 1,
    problem_name: "Some problem",
    language_name: "c++ 17",
    language_version: "test 12.4",
    time_sent: "2023-08-05 12:30:45",
    total_verdict: "Not Solved"
}

export async function load({params, cookies, url}){
    if(TEST){
        return {info};
    }
    try {
        let info = await getSubmission(Number(params.submissionId));
        if(info.author_user_username === cookies.get("username")){
            throw redirect(303, url.pathname + "/full");
        }
        return {info};
    } catch (err: any) {
        throw error(404, err.message);
    }
}