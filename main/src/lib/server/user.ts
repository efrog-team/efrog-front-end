import { request } from "./general"

export async function create(username: string, email: string, name: string, password: string){
    let response = await request("POST", "/users", {username, email, name, password});
    const json = await response.json();
    if(!response.ok){
        throw new Error(json.detail || "Undescribed error");
    }
}

export async function getTocken(username: string, password: string) {
    let response = await request("POST", "/token", {username, password});
    const json = await response.json();
    if(!response.ok){
        throw new Error(json.detail || "Undescribed error");
    }
    return json.token;
}

export async function getMe(token: string){
    let response = await request("GET", "/users/me", "", token);
    const json = await response.json();
    if(!response.ok){
        throw new Error(json.detail || "Undescribed error");
    }
    return json;
}