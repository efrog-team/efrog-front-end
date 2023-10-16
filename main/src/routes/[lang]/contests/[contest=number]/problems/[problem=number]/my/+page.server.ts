import { getIndividualSubmisions, getTeamSubmisions } from '$lib/server/contest';

export async function load({params, cookies, url}){
    return {
        submissions: await getIndividualSubmisions(Number(params.contest), Number(params.problem), 
            cookies.get("username")|| "", cookies.get("auth") || "")
    }
}