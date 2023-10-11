import { deleteCpmpetition, makePrivate, makePublic } from '$lib/server/contest';

export async function PUT({cookies, request, params}) {
    const { action } = await request.json();
    switch (action) {
        case "delete":
            await deleteCpmpetition(Number(params.contest), cookies.get("auth") || "");
            break;
        case "make_public":
            await makePublic(Number(params.contest), cookies.get("auth") || "");
            break;
        case "make_private":
            await makePrivate(Number(params.contest), cookies.get("auth") || "");
            break; 
    }
    return new Response(null, { status: 204 });
}