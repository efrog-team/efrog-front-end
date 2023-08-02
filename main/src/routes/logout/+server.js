export function PUT({cookies}) {
    cookies.delete("auth");
    cookies.delete("username");

    return new Response(null, { status: 204 });
}
