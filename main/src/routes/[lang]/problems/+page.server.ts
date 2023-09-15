import { itemsOnPage } from '$lib/config';
import { getProblems } from '$lib/server/problems';
import { error } from '@sveltejs/kit';

export async function load({ url }) {
    let last = 0; //change in future
    if((Number(url.searchParams.get("page")) || 0) > last) throw error(400, "Bad Request");

	return {
        problems: getProblems((Number(url.searchParams.get("page")) || 0) * itemsOnPage + 1, itemsOnPage),
        page: Number(url.searchParams.get("page")) || 0,
        last,
    }
}