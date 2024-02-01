import { itemsOnPage } from "$lib/config";
import { getProblems } from "$lib/server/problems";

export async function load({ url, cookies }) {
	return {
		problems: getProblems((Number(url.searchParams.get("page")) || 0) * itemsOnPage + 1, itemsOnPage, url.searchParams.get("unapproved")=="true", cookies.get("auth")||""),
		page: Number(url.searchParams.get("page")) || 0,
	};
}