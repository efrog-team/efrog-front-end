import { redirect } from "@sveltejs/kit";

export function GET({params}) {
	throw redirect(302, `/${params.lang}/problems`);
}
