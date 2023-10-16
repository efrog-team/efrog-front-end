import { confirmIndividual, confirmTeam, declineIndividual, declineTeam } from '$lib/server/contest';

export async function PUT({cookies, request, params}) {
    const { action } = await request.json();
    switch (action) {
        case "confirmIndividual":
            await confirmIndividual(Number(params.contest), cookies.get("username") || '', cookies.get("auth") || '');
            break;
        case "declineIndividual":
            await declineIndividual(Number(params.contest), cookies.get("username") || '', cookies.get("auth") || '');
            break;
        case "confirmTeam":
            await confirmTeam(Number(params.contest), cookies.get("username") || '', cookies.get("auth") || '');
            break;
        case "declineTeam":
            await declineTeam(Number(params.contest), cookies.get("username") || '', cookies.get("auth") || '');
            break;
    }
    return new Response(null, { status: 204 });
}
