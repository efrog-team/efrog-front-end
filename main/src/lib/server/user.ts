import { request } from "./general"

interface User{
    username: string
    email: string
    name: string
}

export async function create(username: string, email: string, name: string, password: string){
    let response = await request("POST", "/users", {username, email, name, password});
    const json = await response.json();
    if(!response.ok){
        throw new Error(json.detail || "Undescribed error");
    }
}

export async function getToken(username: string, password: string): Promise<string> {
    let response = await request("POST", "/token", {username, password});
    const json = await response.json();
    if(!response.ok){
        throw new Error(json.detail || "Undescribed error");
    }
    return json.token;
}

export async function getMe(token: string): Promise<User> {
    let response = await request("GET", "/users/me", null, token);
    const json = await response.json();
    if(!response.ok){
        throw new Error(json.detail || "Undescribed error");
    }
    return json;
}

export async function getUser(user:string): Promise<User> {
    let response = await request("GET", "/users/"+user);
    const json = await response.json();
    if(!response.ok){
        throw new Error(json.detail || "Undescribed error");
    }
    return json;
}

export async function updateUserInfo(curUsername:string ,username: string, email: string, name: string, token: string){
    let response = await request("PUT", "/users/"+curUsername, {username, email, name}, token);
    const json = await response.json();
    if(!response.ok){
        throw new Error(json.detail || "Undescribed error");
    }
}

export async function updateUserPass(username:string, password: string, token: string){
    let response = await request("PUT", "/users/"+username, {password}, token);
    const json = await response.json();
    if(!response.ok){
        throw new Error(json.detail || "Undescribed error");
    }
}