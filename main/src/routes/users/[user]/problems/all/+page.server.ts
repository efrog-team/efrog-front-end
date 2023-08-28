import { checkAuth } from '$lib/check.js';
import { myProblems } from '$lib/server/problems.js';
import { error } from '@sveltejs/kit';

export async function load({cookies, params, url}) {
    let userInfo = await checkAuth(cookies, url);

    if(userInfo.username != params.user) throw  error(403, "Access denied");
    return {
        problems: myProblems(params.user, cookies.get("auth") || ""),
    }
}