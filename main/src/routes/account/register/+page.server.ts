import { fail, redirect } from '@sveltejs/kit';
import { create, getToken, getMe } from '$lib/server/user.ts'

let emailCheck = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
let usernameCheck = new RegExp(/^[A-Za-z][A-Za-z0-9_]{2,}$/)

interface DataObj{
	username: string,
	name: string,
	email: string,
	password: string,
	passwordRepeat: string, 
	agree: string
}

function formToObj(formData: FormData): DataObj{
	const data = {};
	formData.forEach((value, key) => (data[key] = value));
	return data;
}

function validateInput(data: FormData){
	if(!data.get("username")?.match(usernameCheck)) throw new Error("Username must have at least 3 symbol");
	if(data.get("name").length == 0) throw new Error("Name is required");
	if(!data.get("email")?.match(emailCheck)) throw new Error("Not an email");
	if(data.get("password")?.length < 8) throw new Error("Password must have at least 8 symbol");
	if(data.get("passwordRepeat") != data.get("password")) throw new Error("Passwords must be equal");
	if(!data.get("agree")) throw new Error("You must agree");
}

export const actions = {
	default: async ({ request, url, cookies}) => {
		const formData = await request.formData();
		try{
			validateInput(formData); 
			await create(formData.get("username"), formData.get("email"), formData.get("name"), formData.get("password"));
		}catch (error){
			return fail(422,{
				error: error.message,
				data: formToObj(formData)
			});
		}
		const token = await getToken(formData.get("username"), formData.get("password"));
		cookies.set('auth', token, { path: '/' });
		cookies.set('username', formData.get("username"), { path: '/' });
		throw redirect(303, url.searchParams.get('back') || '/');
	}
}