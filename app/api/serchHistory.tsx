import { api_key, api_partidas , api_detalhes_partida} from "./api";

export interface Participant {
    puuid: string;
    riotIdGameName: string;
    championName: string;
    kills: number;
    deaths: number;
    assists: number;
    win: boolean;
    visionScore: number;
    wardsPlaced: number;
    wardsKilled: number;
    teamPosition: string;
    goldEarned: number;
    totalMinionsKilled: number;
}

export interface Partidas {
    gameId: string;
    queueId: number;
    gameDuration: number;
    gameMode: string;
    gameType: string;
    participants: Participant[];
}





export async function buscarPartidas(id: string): Promise<String[]> {

    try {
        const response = await api_partidas.get(`${id}/ids?start=0&count=20&api_key=${api_key}`);
        return response.data;
    } catch (err) {
        console.error("Erro ao buscar partidas:", err);
        return [];
    }
}

export async function buscarDetalhesPartida(matchId: string): Promise<Partidas> {   
    try {
        const response = await api_detalhes_partida.get(`${matchId}?api_key=${api_key}`);
        // A API da Riot aninha os dados dentro de uma propriedade 'info'
        if (response.data && response.data.info) {
            return response.data.info;
        }
        // Lança um erro se a estrutura da resposta não for a esperada
        throw new Error("Formato de resposta inesperado da API de detalhes da partida.");
    } catch (err) {
        console.error("Erro ao buscar detalhes da partida:", err);
        throw alert("Erro ao buscar os detalhes da partida. Tente novamente.");
    }
}
