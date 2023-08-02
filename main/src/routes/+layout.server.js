export function load({cookies}) {
	return {
		username: cookies.get("username"),
	};
}