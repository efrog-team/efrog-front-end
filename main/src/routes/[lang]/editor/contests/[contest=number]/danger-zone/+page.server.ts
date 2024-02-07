import { contestDeletable } from "$lib/server/contest";

export async function load({params, cookies}) {
	return {
		deletable: await contestDeletable(+params.contest, cookies.get("auth") || ""),
	};
}