import { request } from "./general";

export async function getProblem(problem_id: number, auth: string = ""): Promise<Problem>{
	const {body} = await request("GET", `/problems/${problem_id}`, null, auth);
	return body;
}

export async function getExamples(problem_id: number, auth: string = ""): Promise<TestCase[]> {
	const {body} = await request("GET", `/problems/${problem_id}/test-cases?only_opened=true`, null, auth);
	return body.test_cases;
}

export async function getPublicProblems(start: number, limit: number): Promise<Problem[]> {
	const {body} = await request("GET", `/problems?start=${start}&limit=${limit}`);
	return body.problems;
}

export async function usersProblems(username: string, ): Promise<Problem[]>{
	const {body} = await request("GET", `/users/${username}/problems?only_public=true`);
	return body.problems;
}

export async function myProblems(username: string, auth: string): Promise<Problem[]>{
	const {body} = await request("GET", `/users/${username}/problems?only_public=false`, null, auth);
	return body.problems;
}

export async function createProblem(name: string, statement: string, input_statement: string, 
	output_statement: string, notes: string, time_restriction: number, memory_restriction: number,
	_private: boolean, auth: string): Promise<number>{
	const {body} = await request("POST", "/problems", {name, statement, input_statement, output_statement, 
		notes, time_restriction, memory_restriction, private: _private}, auth);
	return body.problem_id;
}

export async function updateProblem(problem_id: number, name: string, statement: string, 
	input_statement: string, output_statement: string, notes: string, time_restriction: number, 
	memory_restriction: number, auth: string) {
	await request("PUT", `/problems/${problem_id}`, {name, statement, input_statement, 
		output_statement, notes, time_restriction, memory_restriction}, auth);
}

export async function deleteProblem(problem_id: number, auth: string){
	await request("DELETE", `/problems/${problem_id}`, null, auth);
}

export async function makePublic(problem_id: number, auth: string) {
	await request("PUT", `/problems/${problem_id}/make-public`, null, auth);
}


export async function makePrivate(problem_id: number, auth: string) {
	await request("PUT", `/problems/${problem_id}/make-private`, null, auth);
}

export async function createTestCase(problem_id: number, input: string, solution: string, 
	score: number, opened: boolean, auth: string): Promise<number> {
	const {body} = await request("POST", `/problems/${problem_id}/test-cases`, {input, solution, score, opened}, auth);
	return body.test_case_id;
}

export async function updateTestCase(problem_id: number, test_case_id: number, input: string, 
	solution: string, score: number, auth: string) {
	await request("PUT", `/problems/${problem_id}/test-cases/${test_case_id}`, 
		{input, solution, score}, auth);
}

export async function deleteTestCase(problem_id: number, test_case_id: number, auth: string) {
	await request("DELETE", `/problems/${problem_id}/test-cases/${test_case_id}`, null, auth);
}

export async function getTastCase(problem_id: number, test_case_id: number, auth:string): Promise<TestCase> {
	const {body} = await request("GET", `/problems/${problem_id}/test-cases/${test_case_id}`, null, auth);
	return body;
}

export async function getTestCases(problem_id: number, auth: string): Promise<TestCase[]> {
	const {body} = await request("GET", `/problems/${problem_id}/test-cases`, null, auth);
	return body.test_cases;
}

export async function makeTestCaseOpened(problem_id: number, test_case_id: number, auth: string) {
	await request("PUT", `/problems/${problem_id}/test-cases/${test_case_id}/make-opened`, null, auth);
}

export async function makeTestCaseClosed(problem_id: number, test_case_id: number, auth: string) {
	await request("PUT", `/problems/${problem_id}/test-cases/${test_case_id}/make-closed`, null, auth);
}

export async function getProblems(start: number, limit: number, unapproved: boolean = false, auth: string): Promise<Problem[]>{
	const {body} = await request("GET", `/problems?start=${start}&limit=${limit}&unapproved=${unapproved}`, null, auth);
	return body.problems;
}

export async function deleteAuthorsSubmissions(problem_id: number, auth: string) {
	await request("DELETE", `/problems/${problem_id}/submissions/authors`, null, auth);
}