import { error } from '@sveltejs/kit';
import { getUsersSubmission, type SubmissionPublic } from '$lib/server/submission.js';

const TEST = true;

let submissions: SubmissionPublic[] = [{
    id: 1,
    author_user_username: "tester",
    problem_id: 1,
    problem_name: "some problem",
    language_name: "C 17",
    language_version: "test 12.4",
    time_sent: "2023-08-05 12:30:45",
    total_verdict: "Not Solved"
}, {
    id: 5,
    author_user_username: "tester",
    problem_id: 1,
    problem_name: "other problem",
    language_name: "Node.js",
    language_version: "test 12.4",
    time_sent: "2023-01-05 12:30:45",
    total_verdict: "Solved"
}, {
    id: 7,
    author_user_username: "tester",
    problem_id: 1,
    problem_name: "other problem",
    language_name: "C++ 17",
    language_version: "test 12.4",
    time_sent: "2023-01-05 12:30:45",
    total_verdict: "Compilation Error"
}]

export async function load({params}){
    if(TEST){
        return {
            username: params.user,
            submissions
        }
    }
    try {
        return {
            username: params.user,
            submissions: await getUsersSubmission(params.user)
        }
    } catch (err: any) {
        throw error(403, err.message);
    }
}