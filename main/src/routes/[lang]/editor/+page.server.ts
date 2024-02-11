import { redirect } from "@sveltejs/kit";

export function load({params, cookies}){
	if(cookies.get("username")) throw redirect(303, `/${params.lang}/editor/problems`);
}