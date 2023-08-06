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

let subPub1: SubmitionPublic = {
    id: 1,
    author_user_username: "tester",
    problem_id: 1,
    problem_name: "some problem",
    language_name: "c++ 17",
    language_version: "test 12.4",
    time_sent: "2023-08-05 12:30:45",
    total_verdict: "wrong answer"
}
let subPub2: SubmitionPublic = {
    id: 5,
    author_user_username: "tester",
    problem_id: 1,
    problem_name: "other problem",
    language_name: "C 17",
    language_version: "test 12.4",
    time_sent: "2023-01-05 12:30:45",
    total_verdict: "correct answer"
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

let test1: TestCase = {
    id: 1, 
    submission_id: 2, 
    test_case_id: 1, 
    test_case_score: 50, 
    verdict_text: 'wrong answer', 
    verdict_details: "", 
    time_taken: 123, 
    cpu_time_taken: 123, 
    memory_taken: 2600
}
let test2: TestCase = {
    id: 1, 
    submission_id: 2, 
    test_case_id: 1, 
    test_case_score: 50, 
    verdict_text: 'correct answer', 
    verdict_details: "", 
    time_taken: 123, 
    cpu_time_taken: 123, 
    memory_taken: 2400
}

let subPriv: SubmitionPrivate = {
    id: 1,
    author_user_username: "tester",
    problem_id: 1,
    code: "print(int(input())**2)",
    language_name: "C++ 17",
    language_version: "thh 11.4",
    time_sent: "2023-08-05 12:30:45",
    checked: true,
    correct_score: 50,
    total_score: 100,
    results: [test1, test2]
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


export async function getSubmition(submission_id: number): Promise<SubmitionPublic> {
    let {body} = await request("GET", `/submissions/${submission_id}/public`);
    return body;
}

export async function getUsersSubmition(username: string): Promise<SubmitionPublic[]> {
    let {body} = await request("GET", `/users/${username}/submissions/public`);
    return body;
}

export async function getMySubmition(submission_id: number, auth:string): 
        Promise<{body: SubmitionPrivate, status: number}> {
    let response = await request("GET", `/submissions/${submission_id}`, null, auth);
    return response;
}
