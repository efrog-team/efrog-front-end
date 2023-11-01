import { request } from "./general";

export async function create(username: string, email: string, name: string, password: string){
	await request("POST", "/users", {username, email, name, password});
}

export async function getToken(username: string, password: string): Promise<string> {
	const {body} = await request("POST", "/token", {username, password});
	return body.token;
}

export async function getMe(token: string): Promise<User> {
	const {body} = await request("GET", "/users/me", null, token);
	return body;
}

export async function getUser(user:string): Promise<User> {
	const {body} = await request("GET", "/users/"+user);
	return body;
}

export async function updateUserInfo(curUsername:string ,username: string, email: string, name: string, token: string){
	await request("PUT", "/users/"+curUsername, {username, email, name}, token);
}

export async function updateUserPass(username:string, password: string, token: string){
	await request("PUT", "/users/"+username, {password}, token);
}