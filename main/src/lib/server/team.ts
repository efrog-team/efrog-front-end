import { request } from "./general";

export async function getInfo(team_name: string): Promise<Team> {
	const {body} = await request("GET", `/teams/${team_name}`);
	return body;
}

export async function create(name:string , auth: string){
	await request("POST", "/teams", {name}, auth);
}

export async function rename(team_name: string, name:string , auth: string){
	await request("PUT", `/teams/${team_name}`, {name}, auth);
}

export async function usersTeams(username: string, confirmed: boolean, only_active=true): Promise<Team[]> {
	const {body} = await request("GET", `/users/${username}/teams?only_undeclined=true&only_confirmed=${confirmed}&only_active=${only_active}`);
	return body.teams;
}

export async function activate(name: string, auth: string) {
	await request("PUT", `/teams/${name}/activate`, {}, auth);
}

export async function deactivate(name: string, auth: string) {
	await request("PUT", `/teams/${name}/deactivate`, {}, auth);
}

export async function isDeletable(name: string, auth: string): Promise<boolean> {
	const {body} = await request("GET", `/teams/${name}/check-if-can-be-deleted`, null, auth);
	return body.can;
}

export async function deleteTeam(name: string, auth: string) {
	await request("DELETE", `/teams/${name}`, null, auth);
}

export async function addMember(team_name: string, member_username:string, auth: string){
	await request("POST", `/teams/${team_name}/members`, {member_username}, auth);
}

export async function deleteMember(team_name: string, member_username:string, auth: string){
	await request("DELETE", `/teams/${team_name}/members/${member_username}`, null, auth);
}

export async function getMembers(name: string): Promise<Member[]> {
	const {body} = await request("GET", `/teams/${name}/members`);
	return body.team_members;
}

export async function confirmMember(team_name: string, username: string, auth: string){
	await request("PUT", `/teams/${team_name}/members/${username}/confirm`, null, auth);
}

export async function declineMember(team_name: string, username: string, auth: string){
	await request("PUT", `/teams/${team_name}/members/${username}/decline`, null, auth);
}

export async function makeContestant(team_name: string, member_username: string, auth: string) {
	await request("PUT", `/teams/${team_name}/members/${member_username}/make-contestant`, null, auth);
}

export async function makeCoach(team_name: string, member_username: string, auth: string) {
	await request("PUT", `/teams/${team_name}/members/${member_username}/make-coach`, null, auth);
}