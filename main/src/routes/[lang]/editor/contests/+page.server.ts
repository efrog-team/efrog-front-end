import { getMyContests } from '$lib/server/contest';

export async function load({cookies}) {
    return {
        contests: getMyContests(cookies.get("auth") || ""),
    }
}