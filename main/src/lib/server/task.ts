import { request } from "./general"

interface Problem{
    id: number
    author_user_username: string
    name: string
    statement: string
    input_statement: string
    output_statement: string
    notes: string
    time_restriction: number
    memory_restriction: number
    private: boolean
}

interface TestCase{
    id: number
    problem_id: number
    input: string
    solution: string
    score: number
    opened: boolean
}

export async function getProblem(problem_id: number, auth: string = ""): Promise<Problem>{
    let {body} = await request("GET", `/problems/${problem_id}`, null, auth);
    return body;
}

export async function getExamples(problem_id: number): Promise<TestCase[]> {
    let {body} = await request("GET", `/problems/${problem_id}/test-cases?only_opened=true`);
    return body.test_cases;
}

export async function usersProblems(username: string, ): Promise<Problem[]>{
    let {body} = await request("GET", `/users/${username}/problems?only_public=true`);
    return body.problems;
}

export async function myProblems(username: string, auth: string): Promise<Problem[]>{
    let {body} = await request("GET", `/users/${username}/problems?only_public=false`, null, auth);
    return body.problems;
}