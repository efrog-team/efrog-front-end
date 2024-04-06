import { error, redirect, fail } from "@sveltejs/kit";
import { checkAuth } from "$lib/check.js";
import { updateUserInfo, updateUserPass, getToken } from "$lib/server/user";
import {formToObj} from "$lib/features";
import { cookiesMaxAge } from "$lib/config.js";

export async function load({params, cookies, url}) {
	const data = await checkAuth(cookies, url, params.lang);
	if(data.username != params.user){
		throw error(403, "Is in not your account");
	}
	return {user: data};
}

const emailCheck = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);
const usernameCheck = new RegExp(/^[A-Za-z][A-Za-z0-9_]{2,}$/);

function validateFormInfo(data: Dictionary){
	if(!data["username"]?.match(usernameCheck)) throw new Error("Bad username");
	if(data["name"].length == 0) throw new Error("Name is required");
	if(data["email"] && !data["email"]?.match(emailCheck)) throw new Error("Not an email");
}
function validateFormPass(data: Dictionary){
	if(data["newPass"]?.length < 8) throw new Error("Password must have at least 8 symbol");
	if(data["repeatPass"] != data["newPass"]) throw new Error("Passwords must be equal");
}


export const actions = {
	info: async ({ request, cookies, params}) => {
		const formData = formToObj(await request.formData());
		try{
			validateFormInfo(formData);
			await updateUserInfo(params.user, formData["username"], formData["email"], formData["name"], cookies.get("auth") || "");
		}catch (err: any){
			if(err.status && err.status != 409){
				throw err;
			}
			return fail(422,{
				error: err.message || err.body?.message,
				data: formData,
				type: "info"
			});
		}
		if(formData["username"] != params.user) throw redirect(303, `/${params.lang}/users/${formData["username"]}/edit`);
	},
	password: async ({ request, cookies, params}) => {
		const formData = formToObj(await request.formData());
		try{
			const token = await getToken(params.user, formData["curPass"]);
			validateFormPass(formData); 
			await updateUserPass(params.user, formData["newPass"], token);
		}catch (err: any){
			if(err.status && err.status != 409 && err.status != 401){
				throw err;
			}
			return fail(422,{
				error: err.message || err.body?.message,
				data: formData,
				type: "pass"
			});
		}
		const token = await getToken(params.user, formData["newPass"]);
		cookies.set("auth", token, { path: "/", maxAge: cookiesMaxAge, sameSite: "lax"});
	}
};

