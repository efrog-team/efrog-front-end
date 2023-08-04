import { checkAuth } from "$lib/check";
import { formToObj } from "$lib/features.js"
import { isDeletable, getMembers, addMember, getInfo, deleteMember, makeContestant, makeCoach, rename } from "$lib/server/team.js";
import { error, fail, redirect } from "@sveltejs/kit";


export async function load({params, cookies, url}) {
    let data = await checkAuth(cookies, url);
	let teamInfo;
    try {
        teamInfo = await getInfo(params.team_name);
    } catch (err: any) {
        throw error(404, err.message);
    }
    if(data.username != teamInfo.owner_username){
        throw error(403, "Access denied");
    }

    return {
        teamInfo,
        deletable: await isDeletable(params.team_name, cookies.get("auth")),
        members: await getMembers(params.team_name)
    }
}

let teamNameCheck = new RegExp(/^[A-Za-z][A-Za-z0-9_]{0,}$/);
function validateName(formData){
    if(!formData.get("teamName")?.match(teamNameCheck)) throw new Error("Bad name");
}

export const actions = {
	add: async ({ request, cookies, params}) => {
		const formData = await request.formData();
		try{
			await addMember(params.team_name, formData.get("username"), cookies.get("auth"));
		}catch (error){
			return fail(422,{
				error: error.message,
				data: formToObj(formData)
			});
		}
	},
    delete: async ({ request, cookies, params}) => {
		const formData = await request.formData();
		try{
			await deleteMember(params.team_name, formData.get("username"), cookies.get("auth"));
		}catch (err){
			console.error(err)
		}
	},
	contestant: async ({ request, cookies, params}) => {
		const formData = await request.formData();
		try{
			await makeContestant(params.team_name, formData.get("username"), cookies.get("auth"));
		}catch (err){
			console.error(err)
		}
	},
	coach: async ({ request, cookies, params}) => {
		const formData = await request.formData();
		try{
			await makeCoach(params.team_name, formData.get("username"), cookies.get("auth"));
		}catch (err){
			console.error(err)
		}
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
		throw redirect(303, `/teams/${formData.get("teamName")}/edit`);
	},
}