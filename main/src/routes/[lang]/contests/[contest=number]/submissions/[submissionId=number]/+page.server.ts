import { getSubmission } from "$lib/server/contest";

export async function load({params, cookies}){
	const {body} = await getSubmission(Number(params.contest), Number(params.submissionId), cookies.get("auth")|| "");
	return {info: body};
}