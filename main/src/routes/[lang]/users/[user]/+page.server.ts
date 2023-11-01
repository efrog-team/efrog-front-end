import { getUser } from "$lib/server/user.js";

export async function load({params, cookies}) {
	const data = await getUser(params.user);
	return {
		info: data,
		me: data.username == cookies.get("username")
	};
}
