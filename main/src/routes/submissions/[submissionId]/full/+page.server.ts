import { checkAuth } from '$lib/check.js';
import { getMySubmission, type SubmissionPrivate } from '$lib/server/submission.js';
import { error } from '@sveltejs/kit';

const TEST = true;

let info: SubmissionPrivate = {
    id: 1,
    author_user_username: "tester",
    problem_id: 1,
    problem_name: "Some problem",
    code: "if(True):\r\n    print(4)",
    language_name: "C++ 17",
    language_version: "thh 11.4",
    time_sent: "2023-08-05 12:30:45",
    checked: true,
    correct_score: 50,
    total_score: 100,
    total_verdict: "Not Solved",
    realime_link: undefined,
    results: [{
        id: 1, 
        submission_id: 2, 
        test_case_id: 1, 
        test_case_score: 50, 
        verdict_text: 'Wrong Answer', 
        verdict_details: 'some text', 
        time_taken: 123, 
        cpu_time_taken: 123, 
        memory_taken: 24
    },{
        id: 1, 
        submission_id: 2, 
        test_case_id: 1, 
        test_case_score: 0, 
        verdict_text: 'Wrong Answer', 
        verdict_details: "some error\n\t on line 4", 
        time_taken: 12, 
        cpu_time_taken: 12, 
        memory_taken: 26,
    }]
};

export async function load({params, cookies, url}){
    if(TEST){
        return {info};
    }
    try {
        await checkAuth(cookies, url);
        let {body, status} = await getMySubmission(Number(params.submissionId), cookies.get("auth") || '');
        console.log(body, status);
        return {info: body};
    } catch (err: any) {
        throw error(403, err.message);
    }
}