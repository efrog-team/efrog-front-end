import { myProblems } from '$lib/server/problems.js';

export async function load({cookies, params, url, parent}) {
    let {author} = await parent();
    return {
        problems: myProblems(author.username, cookies.get("auth") || ""),
    }
}