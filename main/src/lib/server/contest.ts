import { request } from "./general"
import type {Problem, TestCase} from "./problems"

export interface Competition{
    id: number
    author_user_username: string
    name: string
    description: string
    start_time: string 
    end_time: string 
    status: string 
    private: boolean
    maximum_team_members_number: number
    auto_confirm_participants: boolean
}

export interface Participant{
    competition_id: number
    username_or_team_name: string
    individual: boolean
    author_confirmed: boolean
    author_declined: boolean
    participant_confirmed: boolean
    participant_declined: boolean 
}

export interface CompetitionProblem extends Problem{
    test_cases: TestCase[];
}

export async function createCompetition(name: string, description: string, start_time: string,end_time: string,
        _private: boolean, maximum_team_members_number: number, auto_confirm_participants: boolean, auth: string): Promise<number> {
    let {body} = await request("POST", "/competitions", {name, description, start_time, end_time, private:_private,
        maximum_team_members_number, auto_confirm_participants}, auth);
    return Number(body.competition_id);
} 

export async function getCompetition(competition_id:number, auth: string): Promise<Competition> {
    let {body} = await request("GET", `/competitions/${competition_id}`, null, auth);
    return body;
}

export async function makePublic(competition_id:number, auth: string) {
    await request("PUT", `/competitions/${competition_id}/make-public`, null, auth);
}

export async function makePrivate(competition_id:number, auth: string) {
    await request("PUT", `/competitions/${competition_id}/make-private`, null, auth);
}

export async function canBeEdited(competition_id:number, auth: string): Promise<boolean> {
    let {body} = await request("GET", `/competitions/${competition_id}/check-if-can-be-edited`, null, auth);
    return body.can;
}

export async function updateCompetition(competition_id:number, name: string, description: string, start_time: string,
        end_time: string, maximum_team_members_number: number, auto_confirm_participants: boolean, auth: string) {
    await request("PUT", `/competitions/${competition_id}`, {name, description, start_time, end_time,
        maximum_team_members_number, auto_confirm_participants}, auth);
} 

export async function deleteCpmpetition(competition_id:number, auth: string) {
    await request("DELETE", `/competitions/${competition_id}`, null, auth);
}

export async function addParticipant(competition_id:number, username_or_team_name: string, individual: boolean, 
        auth: string) {
    await request("POST", `/competitions/${competition_id}/participants`, {username_or_team_name, individual}, auth);
}

export async function getParticipants(competition_id:number, auth: string): Promise<Participant[]> {
    let {body} = await request("GET", `/competitions/${competition_id}/participants`, null, auth);
    return body.participants;
}

export async function confirmIndividual(competition_id:number, username: string, auth: string) {
    await request('PUT', `/competitions/${competition_id}/participants/individuals/${username}/confirm`, null, auth);
}

export async function declineIndividual(competition_id:number, username: string, auth: string) {
    await request('PUT', `/competitions/${competition_id}/participants/individuals/${username}/decline`, null, auth);
}

export async function confirmTeam(competition_id:number, team_name: string, auth: string) {
    await request('PUT', `/competitions/${competition_id}/participants/teams/${team_name}/confirm`, null, auth);
}

export async function declineTeam(competition_id:number, team_name: string, auth: string) {
    await request('PUT', `/competitions/${competition_id}/participants/teams/${team_name}/decline`, null, auth);
}

export async function deleteIndividual(competition_id:number, username: string, auth: string) {
    await request('DELETE', `/competitions/${competition_id}/participants/individuals/${username}`, null, auth);
}

export async function deleteTeam(competition_id:number, team_name: string, auth: string) {
    await request('DELETE', `/competitions/${competition_id}/participants/teams/${team_name}`, null, auth);
}

export async function addProblem(competition_id: number, problem_id: number, auth: string) {
    await request('POST', `/competitions/${competition_id}/problems`, {problem_id}, auth);
}

export async function getProblem(competition_id: number, problem_id: number, auth: string): Promise<CompetitionProblem> {
    let {body} = await request("GET", `/competitions/${competition_id}/problems/${problem_id}`, null, auth);
    return body;
}

export async function deleteProblem(competition_id: number, problem_id: number, auth: string) {
    await request("DELETE", `/competitions/${competition_id}/problems/${problem_id}`, null, auth);
}

export async function getAllProblems(competition_id:number, auth: string): Promise<CompetitionProblem[]> {
    let {body} = await request("GET", `/competitions/${competition_id}/problems`, null, auth);
    return body.problems;
}