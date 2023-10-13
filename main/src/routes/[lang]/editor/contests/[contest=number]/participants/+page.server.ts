import { formToObj } from '$lib/features';
import { getParticipants, addParticipant, deleteIndividual, deleteTeam, confirmIndividual, confirmTeam } from '$lib/server/contest.js';
import { fail } from '@sveltejs/kit';

export async function load({params, cookies}) {
	return { 
		participants: getParticipants(Number(params.contest), cookies.get("auth") || "")
	 };
}


export const actions = {
	add: async ({ request, cookies, params }) => {
		const formData = formToObj(await request.formData());
		let id;
		try {
            if(!formData["name"]) throw Error("Team or user name is required")
			await addParticipant(Number(params.contest), formData["name"], !!formData["individual"], cookies.get("auth")||"");
		} catch (err: any) {
			if(err.status && err.status != 409 && err.status != 404){
				throw err;
			}
			return fail(422, {
				error: err.message || err.body?.message,
				data: formData,
			});
		}
	},
	delete: async ({request, cookies, params}) =>{
		const formData = formToObj(await request.formData());
		if(formData["individual"]){
            await deleteIndividual(Number(params.contest), formData["name"], cookies.get("auth")||"");
        }else{
            await deleteTeam(Number(params.contest), formData["name"], cookies.get("auth")||"");
        }
	},
	confirm: async ({request, cookies, params}) =>{
		const formData = formToObj(await request.formData());
		if(formData["individual"]){
            await confirmIndividual(Number(params.contest), formData["name"], cookies.get("auth")||"");
        }else{
            await confirmTeam(Number(params.contest), formData["name"], cookies.get("auth")||"");
        }
	}
}