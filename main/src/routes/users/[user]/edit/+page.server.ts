import { error, redirect, fail } from '@sveltejs/kit';
import { checkAuth } from '$lib/check.js';
import { updateUserInfo, updateUserPass, getToken } from '$lib/server/user.ts';

export async function load({params, cookies, url}) {
	const data = await checkAuth(cookies, url);
    if(data.username != params.user){
        throw error(403);
    }
    return data;
}

let emailCheck = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
let usernameCheck = new RegExp(/^[A-Za-z][A-Za-z0-9_]{2,}$/)

function formToObj(formData: FormData): DataObj{
	const data = {};
	formData.forEach((value, key) => (data[key] = value));
	return data;
}

function validateFormInfo(data){
	if(data.get("username") && !data.get("username")?.match(usernameCheck)) throw new Error("Bad username");
	if(data.get("name").length == 0) throw new Error("Name is required");
	if(data.get("email") && !data.get("email")?.match(emailCheck)) throw new Error("Not an email");
}
function validateFormPass(data){
	if(data.get("newPass")?.length < 8) throw new Error("Password must have at least 8 symbol");
	if(data.get("repeatPass") != data.get("newPass")) throw new Error("Passwords must be equal");
}


export const actions = {
	info: async ({ request, cookies, params}) => {
		const formData = await request.formData();
		try{
			validateFormInfo(formData);
			await updateUserInfo(params.user, formData.get("username"), formData.get("email"), formData.get("name"), cookies.get("auth"));
		}catch (error){
			return fail(422,{
				error: error.message,
				data: formToObj(formData),
				type: "info"
			});
		}
		if(formData.get("username")) throw redirect(303, `/users/${formData.get("username")}/edit`)
	},
    password: async ({ request, url, cookies, params}) => {
        const formData = await request.formData();
		let token;
		try{
			token = await getToken(params.user, formData.get("curPass"));
			validateFormPass(formData); 
			await updateUserPass(params.user, formData.get("newPass"), token);
		}catch (error){
			return fail(422,{
				error: error.message,
				data: formToObj(formData),
				type: "pass"
			});
		}
		token = await getToken(params.user, formData.get("newPass"));
		cookies.set('auth', token, { path: '/' });
    }
}

