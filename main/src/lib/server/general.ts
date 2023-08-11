import { error, redirect } from '@sveltejs/kit';

const serverUrl = "http://localhost:8000"
const clientUrl = "http://localhost:5173"

export async function request(method:string, path: string , data?: any, auth?:string){
    let options: RequestInit = {
        method, 
        headers: {
            "Content-Type": "application/json",
            "authorization": auth || "",
        }
    }
    if(data) options.body = JSON.stringify(data);
    const response = await fetch(serverUrl + path, options);

    // if there is an Internal Server Error
    if(response.status == 500){
        throw error(500, response.statusText)
    }

    const json = await response.json();
    if(response.ok){
        return {status: response.status, body: json};
    }
    
    // if authorization needed
    if(response.status == 401 || response.status == 403){
        await fetch(clientUrl + "/account/logout", {method: "PUT"});
    }

    throw error(response.status, json.detail || "Undescribed error");
}