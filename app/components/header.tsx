"use client";

import { useState, FormEvent } from "react"
import { api_key, api } from "../api/api";
import { Summoner } from "../api/summoner";

interface HeaderProps {
    onSummonerSearch: (summoner: Summoner | null) => void;
}

function Header({ onSummonerSearch }: HeaderProps) {
    const [riotId, setRiotId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [summoner, setSummoner] = useState<Summoner | null>(null);




async function pesquiserSummoner(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    onSummonerSearch(null); // Limpa o summoner anterior

    const [gameName, tagLine] = riotId.split('#');

    try {
        const response = await api.get<Summoner>(`${gameName}/${tagLine}?api_key=${api_key}`);
        const summonerData = response.data;
        onSummonerSearch(summonerData); 
        setSummoner(summonerData);
        sessionStorage.setItem("summonerPuuid", summonerData.puuid); // Notifica o componente pai

    } catch (err) {
        setError("Erro ao buscar summoner. Verifique o nome e tente novamente.");
        onSummonerSearch(null);
    } finally {
        setLoading(false);
    }
  }


  return (
    <header className="w-full mb-8">
        <div className="text-center mb-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-wider text-white">LOLZIM</h1>
            <p className="text-gray-400">Seu gerenciador de informações de League of Legends</p>
        </div>
        <form onSubmit={pesquiserSummoner} className="flex flex-col sm:flex-row items-center justify-center gap-2 max-w-lg mx-auto">
            <input 
                type="text" 
                placeholder="Nome de Invocador#TAG" 
                className="w-full sm:w-auto flex-grow px-4 py-2 rounded-md border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
                value={riotId}
                onChange={(e) => setRiotId(e.target.value)} 
            />
            <button type="submit" disabled={loading} className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed">
                {loading ? 'Buscando...' : 'Pesquisar'}
            </button>
        </form>

        <div>
            {error && <p className="text-center text-red-400 mt-4">{error}</p>}
        </div>
        <div>
            {summoner && (
                <div className="text-center mt-4">
                    <h2 className="text-2xl font-semibold">{summoner.gameName}#{summoner.tagLine}</h2>
                </div>
            )}
        </div>
    </header>
  )
}

export default Header