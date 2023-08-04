import { request } from "./general"

interface Team{
    name: string
    owner_username: string
    active: boolean
}

interface Member{
    member_username: string
    team_name: string
    coach: boolean
    confirmed: boolean
    canceled: boolean 
}

export async function getInfo(team_name: string): Promise<Team> {
    let response = await request("GET", `/teams/${team_name}`);
    const json = await response.json();
    if(!response.ok){
        throw new Error(json.detail || "Undescribed error");
    }
    return json;
}

export async function create(name:string , auth: string){
    let response = await request("POST", "/teams", {name}, auth);
    const json = await response.json();
    if(!response.ok){
        throw new Error(json.detail || "Undescribed error");
    }
}

export async function rename(team_name: string, name:string , auth: string){
    let response = await request("PUT", `/teams/${team_name}`, {name}, auth);
    const json = await response.json();
    if(!response.ok){
        throw new Error(json.detail || "Undescribed error");
    }
}

export async function usersTeams(username: string): Promise<Team[]> {
    let response = await request("GET", `/users/${username}/teams`);
    const json = await response.json();
    if(!response.ok){
        throw new Error(json.detail || "Undescribed error");
    }
    return json.teams;
}

export async function activate(name: string, auth: string) {
    let response = await request("PUT", `/teams/${name}/activate`, {}, auth);
    const json = await response.json();
    if(!response.ok){
        throw new Error(json.detail || "Undescribed error");
    }
}

export async function deactivate(name: string, auth: string) {
    let response = await request("PUT", `/teams/${name}/deactivate`, {}, auth);
    const json = await response.json();
    if(!response.ok){
        throw new Error(json.detail || "Undescribed error");
    }
}

export async function isDeletable(name: string, auth: string): Promise<boolean> {
    let response = await request("GET", `/teams/${name}/check-if-can-be-deleted`);
    const json = await response.json();
    if(!response.ok){
        throw new Error(json.detail || "Undescribed error");
    }
    return json.can;
}

export async function deleteTeam(name: string, auth: string) {
    let response = await request("DELETE", `/teams/${name}`, null, auth);
    const json = await response.json();
    if(!response.ok){
        throw new Error(json.detail || "Undescribed error");
    }
}

export async function addMember(team_name: string, member_username:string, auth: string){
    let response = await request("POST", `/teams/${team_name}/members`, {member_username}, auth);
    const json = await response.json();
    if(!response.ok){
        throw new Error(json.detail || "Undescribed error");
    }
}

export async function deleteMember(team_name: string, member_username:string, auth: string){
    let response = await request("DELETE", `/teams/${team_name}/members/${member_username}`, null, auth);
    const json = await response.json();
    if(!response.ok){
        throw new Error(json.detail || "Undescribed error");
    }
}

export async function getMembers(name: string): Promise<Member[]> {
    let response = await request("GET", `/teams/${name}/members`);
    const json = await response.json();
    if(!response.ok){
        throw new Error(json.detail || "Undescribed error");
    }
    return json.team_members;
}

export async function confirmMember(team_name: string, username: string, auth: string){
    let response = await request("PUT", `/teams/${team_name}/members/${username}/confirm`, null, auth);
    const json = await response.json();
    if(!response.ok){
        throw new Error(json.detail || "Undescribed error");
    }
}

export async function declineMember(team_name: string, username: string, auth: string){
    let response = await request("PUT", `/teams/${team_name}/members/${username}/cancel`, null, auth);
    const json = await response.json();
    if(!response.ok){
        throw new Error(json.detail || "Undescribed error");
    }
}

export async function makeContestant(team_name: string, member_username: string, auth: string) {
    let response = await request("PUT", `/teams/${team_name}/members/${member_username}/make-contestant`, null, auth);
    const json = await response.json();
    if(!response.ok){
        throw new Error(json.detail || "Undescribed error");
    }
}

export async function makeCoach(team_name: string, member_username: string, auth: string) {
    let response = await request("PUT", `/teams/${team_name}/members/${member_username}/make-coach`, null, auth);
    const json = await response.json();
    if(!response.ok){
        throw new Error(json.detail || "Undescribed error");
    }
}