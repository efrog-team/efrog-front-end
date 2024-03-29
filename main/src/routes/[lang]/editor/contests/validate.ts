import { minContestDuration } from "$lib/config.js";
import { isValidDate } from "$lib/features";

export function validateFormInfo(data: Dictionary){
	if(!data["name"]?.length) throw new Error("Contest name is required");
	if(data["start_time"]!==undefined && !isValidDate(data["start_time"])) throw new Error("Invalid start date");
	if(data["end_time"]!==undefined &&!isValidDate(data["end_time"])) throw new Error("Invalid end date");
	if(!Number.isInteger(Number(data["maximum_team_members_number"]))) throw new Error("Impossible team members number");
	const startDate = new Date(data["start_time"]), endDate = new Date(data["end_time"]);
	if(endDate.getTime() - startDate.getTime() < minContestDuration*1000*60 ) throw new Error("Contest is too short");
	if(+data["only_count_solved_or_not"] && !(data["wrong_attempt_penalty"] && data["time_penalty_coefficient"])) 
		throw new Error("Penalty coefficients are required");
}