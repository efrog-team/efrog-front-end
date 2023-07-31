import { fail, redirect } from '@sveltejs/kit';
import { create, getTocken } from '$lib/server/user.ts'

interface DataObj{
	username: string,
	password: string,
}

function formToObj(formData: FormData): DataObj{
	const data = {};
	formData.forEach((value, key) => (data[key] = value));
	return data;
}

function validateInput(data: FormData){
	if(!data.get("username")) throw new Error("Username is required");
	if(!data.get("password")) throw new Error("Password is required");
}

export const actions = {
	default: async ({ request, url, cookies}) => {
		const formData = await request.formData();
		let token;
		try{
			validateInput(formData); 
			token = await getTocken(formData.get("username"), formData.get("password"));
		}catch (error){
			return fail(422,{
				error: error.message,
				data: formToObj(formData)
			});
		}
		cookies.set('auth', token, { path: '/' });
		throw redirect(303, url.searchParams.get('back') || '/');
	}
}