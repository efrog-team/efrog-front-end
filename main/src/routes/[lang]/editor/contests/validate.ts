import { minContestDuration, minTimeToContest } from '$lib/config.js';
import { isValidDate } from '$lib/features';

export function validateFormInfo(data: {[key:string]: string}){
	if(!data["name"]?.length) throw new Error("Contest name is required");
	if(!isValidDate(data["start_time"])) throw new Error("Invalid start date");
	if(!isValidDate(data["end_time"])) throw new Error("Invalid end date");
	if(!Number.isInteger(Number(data["maximum_team_members_number"]))) throw new Error("Impossible team members number");
    let now = (new Date()), startDate = new Date(data["start_time"]), endDate = new Date(data["end_time"]);
    if(startDate.getTime() - now.getTime() < minTimeToContest*1000*60 ) 
        throw new Error(`Contest must begin at least in ${minTimeToContest} minutes from now`);
    if(endDate.getTime() - startDate.getTime() < minContestDuration*1000*60 ) throw new Error(`Contest is too short`);
}