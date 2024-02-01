import {formToObj} from "$lib/features";
import { createContest } from "$lib/server/contest.js";
import {fail, redirect} from "@sveltejs/kit";
import { validateFormInfo } from "../validate";

export const actions = {
	save: async ({ request, cookies, params }) => {
		const formData = formToObj(await request.formData());
		let id;
		try {
			validateFormInfo(formData);
			id = await createContest(formData["name"], formData["description"], formData["start_time"], 
				formData["end_time"], true, Number(formData["maximum_team_members_number"]), 
				!!formData["auto_confirm_participants"], !!+formData["only_count_solved_or_not"], 
				!!formData["count_scores_as_percentages"], +formData["time_penalty_coefficient"] || 0, 
				+formData["wrong_attempt_penalty"] || 0,cookies.get("auth")||"");
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
