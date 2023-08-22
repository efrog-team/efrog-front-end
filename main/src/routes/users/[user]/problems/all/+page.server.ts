import { checkAuth } from '$lib/check.js';
import { myProblems } from '$lib/server/task.js';

export async function load({cookies, params, url}) {
    await checkAuth(cookies, url);
    return {
        problems: myProblems(params.user, cookies.get("auth") || ""),
    }
}