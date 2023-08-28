import { usersProblems } from '$lib/server/problems.js';
import { redirect } from '@sveltejs/kit';

export async function load({cookies, params, url}) {
    if(params.user == cookies.get("username")){
        throw redirect(303, url.pathname + "/all");
    }
    return {
        problems: await usersProblems(params.user),
        username: params.user
    }
}