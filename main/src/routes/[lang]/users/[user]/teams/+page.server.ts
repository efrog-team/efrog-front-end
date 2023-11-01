import { usersTeams, create } from "$lib/server/team.js";
import { error, fail, redirect } from "@sveltejs/kit";
import {formToObj} from "$lib/features.js";

export async function load({params, cookies}){
	try {
		return {
			username: params.user,
			me: cookies.get("username") === params.user,
			teams: await usersTeams(params.user, cookies.get("username") != params.user, false),
		};
	} catch (err: any) {
		throw error(403, err.message);
	}
}

const teamNameCheck = new RegExp(/^[A-Za-z][A-Za-z0-9_]{0,}$/);

function validateInput(formData: Dictionary){
	if(!formData["teamName"]?.match(teamNameCheck)) throw new Error("Bad name");
}

export const actions = {
	create: async ({ request, cookies, params}) => {
		const formData = formToObj(await request.formData());
		try{
			validateInput(formData); 
			await create(formData["teamName"], cookies.get("auth") || "");
		}catch (err: any){
			if(err.status && err.status != 409){
				throw err;
			}
			return fail(422,{
				error: err.message || err.body?.message,
				data: formData
			});
		}
		throw redirect(303, `/${params.lang}/teams/${formData["teamName"]}/edit`);
	}
};