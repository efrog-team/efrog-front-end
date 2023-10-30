import { itemsOnPage } from '$lib/config';
import { getPublicContests } from '$lib/server/contest';

export async function load({ url, cookies }) {
    let contests =  await getPublicContests((Number(url.searchParams.get("page")) || 0) * itemsOnPage + 1, itemsOnPage);
    contests = contests.sort((a,b) => (new Date(b.end_time)).valueOf() - (new Date(a.end_time)).valueOf());
	return {
        contests,
        page: Number(url.searchParams.get("page")) || 0,
    }
}