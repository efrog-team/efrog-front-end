import { formToObj, formatDate } from "$lib/features";
import { updateContest } from "$lib/server/contest";
import { fail } from "@sveltejs/kit";
import { validateFormInfo } from "../validate";

export const actions = {
	save: async ({ request, cookies, params }) => {
		const formData = formToObj(await request.formData());
		try {
			validateFormInfo(formData);
			await updateContest(Number(params.contest), formData["name"], formData["description"], formData["start_time"]?formatDate(formData["start_time"]):null, 
				formData["end_time"]?formatDate(formData["end_time"]):null, Number(formData["maximum_team_members_number"]), 
				!!formData["auto_confirm_participants"], cookies.get("auth")||"");
		} catch (err: any) {
			if(err.status && err.status != 409 && err.status != 400){
				throw err;
			}
			return fail(422, {
				error: err.message || err.body?.message,
			});
		}
	}
};