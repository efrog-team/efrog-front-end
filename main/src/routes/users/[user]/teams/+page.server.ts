import { usersTeams } from '$lib/server/team.js';
import { error } from '@sveltejs/kit';

let teams = [
    {
        name: "team1",
        owner_username: "tyu",
        active: true
    },
    {
        name: "team2",
        owner_username: "tyu",
        active: false,
    },
    {
        name: "team3",
        owner_username: "tyu2",
        active: true
    },
    {
        name: "team4",
        owner_username: "tyu3",
        active: false
    },
]

export async function load({params, cookies}){
    try {
        //let teams = await usersTeams(params.user);
        return {
            username: params.user,
            me: cookies.get("username") === params.user,
            teams: teams,
        }
    } catch (err: any) {
        throw error(505, err.message);
    }
}