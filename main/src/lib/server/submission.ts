import { request } from "./general"

interface SubmitionPublic{
    id: number
    author_user_username: string
    problem_id: number
    problem_name: string
    language_name: string
    language_version: string
    time_sent: string
    total_verdict: string
}

interface SubmitionPrivate{
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


export async function getSubmition(submission_id: string): Promise<SubmitionPublic> {
    let {body} = await request("GET", `/submissions/${submission_id}/public`);
    return body;
}

export async function getUsersSubmition(username: string): Promise<SubmitionPublic[]> {
    let {body} = await request("GET", `/users/${username}/submissions/public`);
    return body;
}
