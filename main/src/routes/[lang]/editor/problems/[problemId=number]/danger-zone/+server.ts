import { deleteAuthorsSubmissions, deleteProblem, makePrivate, makePublic } from '$lib/server/problems';

export async function PUT({cookies, request, params}) {
    const { action } = await request.json();
    switch (action) {
        case "delete":
            await deleteProblem(Number(params.problemId), cookies.get("auth") || "");
            break;
        case "make_public":
            await makePublic(Number(params.problemId), cookies.get("auth") || "");
            break;
        case "make_private":
            await makePrivate(Number(params.problemId), cookies.get("auth") || "");
            break; 
        case "delete_submissions":
            await deleteAuthorsSubmissions(Number(params.problemId), cookies.get("auth") || "");
            break;
    }
    return new Response(null, { status: 204 });
}