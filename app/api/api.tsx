// https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/xlvgx/br1?api_key=RGAPI-f6250c13-9323-40cc-96e2-87420dd7a59a


import axios from "axios";

const api = axios.create({
  baseURL: "https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/",
});

const api_key = "RGAPI-a9fc6682-7252-4ddd-8ffe-1d9b7cf23afb";

const api_ranked = axios.create({
    baseURL: "https://br1.api.riotgames.com/lol/league/v4/entries/by-puuid/",
});

const api_partidas = axios.create({
    baseURL: "https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/"
});

const api_detalhes_partida = axios.create({
    baseURL: "https://americas.api.riotgames.com/lol/match/v5/matches/"
});
export { api, api_key, api_ranked, api_partidas, api_detalhes_partida };