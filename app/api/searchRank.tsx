import { api_key, api_ranked } from "./api";




export interface Ranked {
    leagueId: string;
    queueType: string;
    tier: string;
    rank: string;
    summonerId: string;
    summonerName: string;
    leaguePoints: number;
    wins: number;
    losses: number;
    veteran: boolean;
    inactive: boolean;
    freshBlood: boolean;
    hotStreak: boolean;
}







export async function buscarRank(puuid: string) : Promise<Ranked[]> {
    try {
        const response = await api_ranked.get(`${puuid}?api_key=${api_key}`);
        return response.data;  
       } catch (err) {
        console.error("Error fetching rank:", err);
        throw alert("Erro ao buscar o rank. Tente novamente.");
       }
    }
   