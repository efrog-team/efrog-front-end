import {formToObj, formatDate} from "$lib/features";
import { createContest } from "$lib/server/contest.js";
import {fail, redirect} from "@sveltejs/kit";
import { validateFormInfo } from "../validate";

export const actions = {
	save: async ({ request, cookies, params }) => {
		const formData = formToObj(await request.formData());
		let id;
		try {
			validateFormInfo(formData);
			id = await createContest(formData["name"], formData["description"], formatDate(formData["start_time"]), 
				formatDate(formData["end_time"]), true, Number(formData["maximum_team_members_number"]), 
				!!formData["auto_confirm_participants"], cookies.get("auth")||"");
		} catch (err: any) {
			if(err.status && err.status != 409 && err.status != 400){
				throw err;
			}
			return fail(422, {
				error: err.message || err.body?.message,
				data: formData,
			});
		}
		throw redirect(303, `/${params.lang}/editor/contests/${id}`);
	}
};
