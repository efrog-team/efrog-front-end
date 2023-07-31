import { error } from '@sveltejs/kit';
import { getUser } from '$lib/server/user.js'

export async function load({params, cookies}) {
	try{
        let data = await getUser(params.user);
        data.me = data.username == cookies.get("username");
        return data;
    }catch (err){
        throw error(404);
    }
}
