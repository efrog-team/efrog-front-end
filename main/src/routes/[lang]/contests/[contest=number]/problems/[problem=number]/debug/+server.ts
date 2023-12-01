import { formatCode, getLangInfo } from "$lib/features.js";
import { debug } from "$lib/server/submission.js";
import { json } from "@sveltejs/kit";

export async function POST({cookies, request}) {
	const {code, lang, input} = await request.json();
	const {language, version} = getLangInfo(lang);
	return json(await debug(formatCode(code), language, version, input, cookies.get("auth")||""));
}