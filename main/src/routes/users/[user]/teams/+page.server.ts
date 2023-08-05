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
        throw error(505, err.message);
    }
}

let teamNameCheck = new RegExp(/^[A-Za-z][A-Za-z0-9_]{0,}$/);

function validateInput(formData){
    if(!formData.get("teamName")?.match(teamNameCheck)) throw new Error("Bad name");
}

export const actions = {
	create: async ({ request, cookies}) => {
		const formData = await request.formData();
		try{
			validateInput(formData); 
			await create(formData.get("teamName"), cookies.get("auth"));
		}catch (error){
			return fail(422,{
				error: error.message,
				data: formToObj(formData)
			});
		}
		throw redirect(303, `/teams/${formData.get("teamName")}/edit`);
	}
}