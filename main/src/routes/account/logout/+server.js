export async function PUT({cookies}) {
    cookies.delete("auth", { path: '/' });
    cookies.delete("username", { path: '/' });
    return new Response(null, { status: 204 });
}
