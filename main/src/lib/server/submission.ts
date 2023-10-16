import { request } from "./general"

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
    return body.submissions;
}

export async function getMySubmission(submission_id: number, auth:string): 
        Promise<{body: SubmissionPrivate, status: number}> {
    let response = await request("GET", `/submissions/${submission_id}`, null, auth);
    return response;
}

export async function getProblemSubmission(username: string, problem_id: number): Promise<SubmissionPublic[]> {
    let {body} = await request("GET", `/users/${username}/submissions/public/problems/${problem_id}`);
    return body.submissions;
}
