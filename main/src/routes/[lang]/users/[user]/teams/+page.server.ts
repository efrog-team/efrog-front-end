import { usersTeams, create } from '$lib/server/team.js';
import { error, fail, redirect } from '@sveltejs/kit';
import {formToObj} from '$lib/features.js'

export async function load({params, cookies}){
    try {
        return {
            username: params.user,
            me: cookies.get("username") === params.user,
            teams: await usersTeams(params.user),
        }
    } catch (err: any) {
        throw error(403, err.message);
    }
}

let teamNameCheck = new RegExp(/^[A-Za-z][A-Za-z0-9_]{0,}$/);

function validateInput(formData){
    if(!formData.get("teamName")?.match(teamNameCheck)) throw new Error("Bad name");
}

export const actions = {
	create: async ({ request, cookies, params}) => {
		const formData = await request.formData();
		try{
			validateInput(formData); 
			await create(formData.get("teamName"), cookies.get("auth"));
		}catch (err){
			if(err.status && err.status != 409){
				throw err;
			}
			return fail(422,{
				error: err.message,
				data: formToObj(formData)
			});
		}
		throw redirect(303, `${params.lang}/teams/${formData.get("teamName")}/edit`);
	}
}