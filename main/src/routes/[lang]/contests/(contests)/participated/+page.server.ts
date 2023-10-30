import { getParticipatedContests } from '$lib/server/contest';
import { error } from '@sveltejs/kit';

export async function load({ url, cookies }) {
    let contests = await getParticipatedContests(cookies.get("auth") || "");
    contests = contests.filter(contest => !contest.participant_declined);
    contests = contests.sort((a,b) => (new Date(b.end_time)).valueOf() - (new Date(a.end_time)).valueOf());
	return {
        contests
    }
}