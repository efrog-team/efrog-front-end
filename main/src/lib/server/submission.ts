import { request } from "./general"

export interface SubmissionPublic{
    id: number
    author_user_username: string
    problem_id: number
    problem_name: string
    language_name: string
    language_version: string
    time_sent: string
    total_verdict: string
}

export interface SubmissionPrivate{
    id: number
    author_user_username: string
    problem_id: number
    code: string
    language_name: string
    language_version: string
    time_sent: string
    checked: boolean
    correct_score: number
    total_score: number
    total_verdict: string
    results: TestCase[]
}

interface TestCase{
    id: number 
    submission_id: number 
    test_case_id: number 
    test_case_score: number 
    verdict_text: string 
    verdict_details: string 
    time_taken: number 
    cpu_time_taken: number 
    memory_taken: number
}

export async function submit(problem_id: number, code: string, language_name:  string, 
        language_version: string, auth: string): Promise<number> {
    let {body} = await request("POST", "/submissions", {problem_id, code, language_name, 
        language_version}, auth);
    return body.submission_id;
}


export async function getSubmission(submission_id: number): Promise<SubmissionPublic> {
    let {body} = await request("GET", `/submissions/${submission_id}/public`);
    return body;
}

export async function getUsersSubmission(username: string): Promise<SubmissionPublic[]> {
    let {body} = await request("GET", `/users/${username}/submissions/public`);
    return body;
}

export async function getMySubmission(submission_id: number, auth:string): 
        Promise<{body: SubmissionPrivate, status: number}> {
    let response = await request("GET", `/submissions/${submission_id}`, null, auth);
    return response;
}
