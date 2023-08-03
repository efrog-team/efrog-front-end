import { request } from "./general"

interface Team{
    name: string
    owner_username: string
    active: boolean
}

interface Member{
    username: string
    email: string
    name: string
    confirmed: boolean
}

export async function create(name:string , auth: string){
    let response = await request("POST", "/teams", {name}, auth);
    const json = await response.json();
    if(!response.ok){
        throw new Error(json.detail || "Undescribed error");
    }
}

export async function usersTeams(username: string): Promise<Team[]> {
    let response = await request("GET", `/users/${username}/teams?only_owned=false&only_active=false`);
    console.log(response.status);
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

export async function getMembers(name: string): Promise<Member[]> {
    let response = await request("GET", `/teams/${name}/members?only_comfirmed=false`);
    const json = await response.json();
    if(!response.ok){
        throw new Error(json.detail || "Undescribed error");
    }
    return json.team_members;
}

export async function confirmMember(team_name: string, username: string, auth: string){
    let response = await request("PUT", `/teams/${team_name}/members/${username}/confirm`, {}, auth);
    const json = await response.json();
    if(!response.ok){
        throw new Error(json.detail || "Undescribed error");
    }
}