import { checkAuth } from "$lib/check";
import { formToObj } from "$lib/features.js";
import { isDeletable, getMembers, addMember, getInfo, deleteMember, makeContestant, makeCoach, rename } from "$lib/server/team.js";
import { error, fail, redirect } from "@sveltejs/kit";


export async function load({params, cookies, url}) {
	const data = await checkAuth(cookies, url, params.lang);
	const teamInfo = await getInfo(params.team_name);
	if(data.username != teamInfo.owner_user_username){
		throw error(403, "You are not the owner of this team");
	}

	return {
		teamInfo,
		deletable: await isDeletable(params.team_name, cookies.get("auth")),
		members: await getMembers(params.team_name)
	};
}

const teamNameCheck = new RegExp(/^[A-Za-z][A-Za-z0-9_]{0,}$/);
function validateName(formData){
	if(!formData.get("teamName")?.match(teamNameCheck)) throw new Error("Bad name");
}

export const actions = {
	add: async ({ request, cookies, params}) => {
		const formData = await request.formData();
		try{
			await addMember(params.team_name, formData.get("username"), cookies.get("auth"));
		}catch (err){
			if(err.status && err.status != 409 && err.status != 404){
				throw err;
			}
			return fail(422,{
				error: err.message || err.body?.message,
				data: formToObj(formData)
			});
		}
	},
	delete: async ({ request, cookies, params}) => {
		const formData = await request.formData();
		await deleteMember(params.team_name, formData.get("username"), cookies.get("auth"));
	},
	contestant: async ({ request, cookies, params}) => {
		const formData = await request.formData();
		await makeContestant(params.team_name, formData.get("username"), cookies.get("auth"));
	},
	coach: async ({ request, cookies, params}) => {
		const formData = await request.formData();
		await makeCoach(params.team_name, formData.get("username"), cookies.get("auth"));
	},
	rename: async ({ request, cookies, params}) => {
		const formData = await request.formData();
		try{
			validateName(formData);
			await rename(params.team_name, formData.get("teamName"), cookies.get("auth"));
		}catch (err){
			return fail(422,{
				error: err.message,
				data: formToObj(formData)
			});
		}
		throw redirect(303, `${params.lang}/teams/${formData.get("teamName")}/edit`);
	},
};