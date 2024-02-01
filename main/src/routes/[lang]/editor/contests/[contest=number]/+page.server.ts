import { formToObj } from "$lib/features";
import { updateContest } from "$lib/server/contest";
import { fail } from "@sveltejs/kit";
import { validateFormInfo } from "../validate";

export const actions = {
	save: async ({ request, cookies, params }) => {
		const formData = formToObj(await request.formData());
		try {
			validateFormInfo(formData);
			await updateContest(Number(params.contest), formData["name"], formData["description"], formData["start_time"], 
				formData["end_time"], Number(formData["maximum_team_members_number"]), 
				!!formData["auto_confirm_participants"], !!+formData["only_count_solved_or_not"], 
				!!formData["count_scores_as_percentages"], +formData["time_penalty_coefficient"] || 0, 
				+formData["wrong_attempt_penalty"] || 0, cookies.get("auth")||"");
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