import { formToObj, formatDate } from "$lib/features";
import { updateCompetition } from "$lib/server/contest";
import { fail } from "@sveltejs/kit";
import { validateFormInfo } from "../validate";

export const actions = {
	save: async ({ request, cookies, params }) => {
		const formData = formToObj(await request.formData());
		let id;
		try {
			console.log("end", formData["end_time"])
            validateFormInfo(formData);
			id = await updateCompetition(Number(params.contest), formData["name"], formData["description"], formatDate(formData["start_time"]), 
                formatDate(formData["end_time"]), Number(formData["maximum_team_members_number"]), 
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
	}
}