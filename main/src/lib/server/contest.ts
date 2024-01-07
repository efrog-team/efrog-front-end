import { request } from "./general";

export async function createContest(name: string, description: string, start_time: string,end_time: string,
	_private: boolean, maximum_team_members_number: number, auto_confirm_participants: boolean, auth: string): Promise<number> {
	const {body} = await request("POST", "/competitions", {name, description, start_time, end_time, private:_private,
		maximum_team_members_number, auto_confirm_participants}, auth);
	return Number(body.competition_id);
} 

export async function getContest(competition_id:number, auth: string): Promise<Contest> {
	const {body} = await request("GET", `/competitions/${competition_id}`, null, auth);
	return body;
}

export async function makePublic(competition_id:number, auth: string) {
	await request("PUT", `/competitions/${competition_id}/make-public`, null, auth);
}

export async function makePrivate(competition_id:number, auth: string) {
	await request("PUT", `/competitions/${competition_id}/make-private`, null, auth);
}

export async function canBeEdited(competition_id:number, auth: string): Promise<boolean> {
	const {body} = await request("GET", `/competitions/${competition_id}/check-if-can-be-edited`, null, auth);
	return body.can;
}

export async function updateContest(competition_id:number, name: string, description: string, start_time: string|null,
	end_time: string|null, maximum_team_members_number: number, auto_confirm_participants: boolean, auth: string) {
	await request("PUT", `/competitions/${competition_id}`, {name, description, start_time, end_time,
		maximum_team_members_number, auto_confirm_participants}, auth);
} 

export async function deleteCpmpetition(competition_id:number, auth: string) {
	await request("DELETE", `/competitions/${competition_id}`, null, auth);
}

export async function getPublicContests(start: number, limit: number, unapproved: boolean = false): Promise<Contest[]>{
	const {body} = await request("GET", `/competitions?start=${start}&limit=${limit}&unapproved=${unapproved}`);
	return body.competitions;
}

export async function getParticipatedContests(auth: string): Promise<(Contest&Participant)[]>{
	const {body} = await request("GET", "/users/me/competitions/participated", null, auth);
	return body.competitions;
}

export async function getMyContests(auth: string): Promise<Contest[]>{
	const {body} = await request("GET", "/users/me/competitions/authored", null, auth);
	return body.competitions;
}

export async function addParticipant(competition_id:number, username_or_team_name: string, individual: boolean, 
	auth: string) {
	await request("POST", `/competitions/${competition_id}/participants`, {username_or_team_name, individual}, auth);
}

export async function getParticipants(competition_id:number, auth: string): Promise<Participant[]> {
	const {body} = await request("GET", `/competitions/${competition_id}/participants`, null, auth);
	return body.participants;
}

export async function getParticipantData(competition_id: number, username: string, auth: string): Promise<Participant>{
	const  {body} = await request("GET", `/competitions/${competition_id}/participants/users/${username}`, null, auth);
	return body;
}

export async function confirmIndividual(competition_id:number, username: string, auth: string) {
	await request("PUT", `/competitions/${competition_id}/participants/individuals/${username}/confirm`, null, auth);
}

export async function declineIndividual(competition_id:number, username: string, auth: string) {
	await request("PUT", `/competitions/${competition_id}/participants/individuals/${username}/decline`, null, auth);
}

export async function confirmTeam(competition_id:number, team_name: string, auth: string) {
	await request("PUT", `/competitions/${competition_id}/participants/teams/${team_name}/confirm`, null, auth);
}

export async function declineTeam(competition_id:number, team_name: string, auth: string) {
	await request("PUT", `/competitions/${competition_id}/participants/teams/${team_name}/decline`, null, auth);
}

export async function deleteIndividual(competition_id:number, username: string, auth: string) {
	await request("DELETE", `/competitions/${competition_id}/participants/individuals/${username}`, null, auth);
}

export async function deleteTeam(competition_id:number, team_name: string, auth: string) {
	await request("DELETE", `/competitions/${competition_id}/participants/teams/${team_name}`, null, auth);
}

export async function addProblem(competition_id: number, problem_id: number, auth: string) {
	await request("POST", `/competitions/${competition_id}/problems`, {problem_id}, auth);
}

export async function getProblem(competition_id: number, problem_id: number, auth: string): Promise<ContestProblem> {
	const {body} = await request("GET", `/competitions/${competition_id}/problems/${problem_id}`, null, auth);
	return body;
}

export async function deleteProblem(competition_id: number, problem_id: number, auth: string) {
	await request("DELETE", `/competitions/${competition_id}/problems/${problem_id}`, null, auth);
}

export async function getAllProblems(competition_id:number, auth: string): Promise<ContestProblem[]> {
	const {body} = await request("GET", `/competitions/${competition_id}/problems`, null, auth);
	return body.problems;
}

export async function submit(competition_id: number, problem_id: number, code: string, 
	language_name: string, language_version: string, auth: string): Promise<number> {
	const {body} = await request("POST", `/competitions/${competition_id}/submissions`, 
		{problem_id, code, language_name, language_version}, auth);
	return body.submission_id;
}
export async function getSubmission(competition_id: number, submission_id: number, auth: string)
        :Promise<{body: SubmissionPrivate, status: number}> {
	const responce =  await request("GET", `/competitions/${competition_id}/submissions/${submission_id}`, null, auth);
	return responce;
}

export async function getIndividualSubmisions(competition_id: number, problem_id: number, username: string, auth: string): Promise<SubmissionPublic[]> {
	const {body} = await request("GET", 
		`/competitions/${competition_id}/participants/individuals/${username}/submissions/public/problems/${problem_id}`, 
		null, auth);
	return body.submissions;
}

export async function getTeamSubmisions(competition_id: number, problem_id: number, team_name: string, auth: string): Promise<SubmissionPublic[]> {
	const {body} = await request("GET", 
		`/competitions/${competition_id}/participants/teams/${team_name}/submissions/public/problems/${problem_id}`, 
		null, auth);
	return body.submissions;
}

export async function getAllIndividualSubmisions(competition_id: number, username: string, auth: string): Promise<SubmissionPublic[]> {
	const {body} = await request("GET",
		`/competitions/${competition_id}/participants/individuals/${username}/submissions/public`, null, auth);
	return body.submissions;
}

export async function getAllTeamSubmisions(competition_id: number, team_name: string, auth: string): Promise<SubmissionPublic[]> {
	const {body} = await request("GET", 
		`/competitions/${competition_id}/participants/teams/${team_name}/submissions/public`, null, auth);
	return body.submissions;
}

export async function getScoreboard(competition_id: number, auth: string): Promise<ScoreboardResult[]> {
	const {body} = await request("GET", `/competitions/${competition_id}/scoreboard`, null, auth);
	return body.participants; 
}
