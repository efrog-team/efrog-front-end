import { getParticipatedContests } from '$lib/server/contest';
import { error } from '@sveltejs/kit';

export async function load({ url, cookies }) {
    let contests = await getParticipatedContests(cookies.get("auth") || "");
    contests.filter(contest => !contest.participant_declined);

	return {
        contests
    }
}