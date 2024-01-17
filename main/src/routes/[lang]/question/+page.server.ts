import { formToObj } from "$lib/features";
import { askQuestion, getUser } from "$lib/server/user.js";
import { fail, redirect } from "@sveltejs/kit";

export async function load({cookies}) {
	let email: string = "";
	try {
		if(cookies.get("username")) email = (await getUser(cookies.get("username") || "")).email;
	} catch (err:any){
		if(err.status != 404) throw err;
	}
	return {email};
}

export const actions = {
	submit: async ({ request, params }) => {
		const formData = formToObj(await request.formData());
		if(!formData["topic"] || !formData["email"] || !formData["question"]){
			return fail(422, {
				error: "All fields are required",
				data: formData,
			});
		}
		await askQuestion(formData["email"], formData["topic"], formData["question"]);
		throw redirect(303, `/${params.lang}/question/submitted`);
	}
};