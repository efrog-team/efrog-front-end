import { itemsOnPage } from '$lib/config';
import { getPublicContests } from '$lib/server/contest';
import { error } from '@sveltejs/kit';

export async function load({ url, cookies }) {
    let last = 0; //change in future
    if((Number(url.searchParams.get("page")) || 0) > last) throw error(400, "Bad Request");

	return {
        contests: getPublicContests((Number(url.searchParams.get("page")) || 0) * itemsOnPage + 1, itemsOnPage),
        page: Number(url.searchParams.get("page")) || 0,
        last,
    }
}