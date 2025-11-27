"use client";

import { useEffect, useState } from "react";
import { buscarPartidas, buscarDetalhesPartida, Partidas, Participant } from "../api/serchHistory";


function historicos(    { puuid }: { puuid: string }) {

    const [partidas, setPartidas] = useState<Partidas[]>([]);
    const [listaDeIds, setListaDeIds] = useState<String[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        if (puuid) {
            handleBuscarListaPartidas(puuid);
        }
    }, [puuid]); // Reage a mudanças no puuid vindo das props

    useEffect(() => {
        if (listaDeIds.length > 0) {
            const fetchDetalhes = async () => {
                setLoading(true);
                setError(null);
                setPartidas([]); // Limpa as partidas antigas antes de buscar novas

                const idsParaBuscar = listaDeIds.slice(0, 5); // Pega os 5 primeiros IDs
                try {
                    const promises = idsParaBuscar.map(id => buscarDetalhesPartida(id as string));
                    const detalhesDasPartidas = await Promise.all(promises);
                    setPartidas(detalhesDasPartidas);
                } catch (err) {
                    setError("Não foi possível carregar os detalhes das partidas.");
                    setPartidas([]);
                } finally {
                    setLoading(false);
                }
            };

            fetchDetalhes();
        } else {
            setPartidas([]);
        }
    }, [listaDeIds]); // Reage quando a lista de IDs é preenchida
    
    async function handleBuscarListaPartidas(puuid: string) {
        setLoading(true);
        setError(null);
        setPartidas([]); // Limpa as partidas antigas
        try {
            const response = await buscarPartidas(puuid);
            setListaDeIds(response); // Armazena a lista completa de IDs
        } catch (err) {
            setError("Não foi possível carregar as partidas.");
            setListaDeIds([]);
            setLoading(false);
        }
        // O loading é gerenciado pelo useEffect que busca os detalhes
    }

    // A função handleBuscarDetalhesPartida não é mais necessária aqui, pois a lógica foi movida para o useEffect


  return (
    <div className="mt-8">
        <h2 className="text-3xl font-bold text-center mb-6">Histórico de Partidas</h2>
        <div className="flex flex-col gap-6">
            {loading && <p>Carregando histórico...</p>}
            {error && <p className="text-red-400">{error}</p>}
            {partidas.map((partida) => {
                const mainPlayer = partida.participants.find(p => p.puuid === puuid);
                const won = mainPlayer ? mainPlayer.win : false;

                const team1 = partida.participants.slice(0, 5);
                const team2 = partida.participants.slice(5, 10);

                return (
                    <div key={partida.gameId} className={`mb-4 p-3 rounded-lg border ${won ? 'bg-blue-900/20 border-blue-700' : 'bg-red-900/20 border-red-700'}`}>
                        {/* Informações gerais da partida */}
                        <div className="flex justify-between items-center text-xs mb-3 px-1">
                            <div>
                                <p className="font-bold text-base">{partida.gameMode.replace(/_/g, ' ')}</p>
                                <p className="text-gray-400">{Math.floor(partida.gameDuration / 60)} minutos</p>
                            </div>
                            <p className={`font-bold text-lg ${won ? 'text-blue-400' : 'text-red-400'}`}>
                                {won ? 'Vitória' : 'Derrota'}
                            </p>
                        </div>

                        {/* Container dos times */}
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                            {/* Time 1 */}
                            <div className="flex flex-col gap-1 flex-1">
                                {team1.map((participant) => (
                                    <div key={participant.puuid} className={`flex items-center justify-between p-1.5 rounded text-xs ${participant.puuid === puuid ? 'bg-white/20' : 'bg-black/20'}`}>
                                        <div className="flex items-center gap-2 w-2/5">
                                            <div className="w-8 h-8 bg-gray-700 rounded" title={participant.championName}></div> {/* Placeholder para ícone */}
                                            <p className="font-semibold truncate" title={participant.riotIdGameName}>{participant.riotIdGameName}</p>
                                        </div>
                                        <div className="text-center flex">
                                            <p className="font-semibold">{participant.kills}/{participant.deaths}/{participant.assists}</p>
                                            <p className="font-semibold">{participant.visionScore} Vision Score</p> 
                                            <p className="font-semibold">{participant.wardsPlaced} Wards Placed</p>
                                            <p className="font-semibold">{participant.wardsKilled} Wards Killed</p>
                                        </div>
                                        <div className="text-right w-1/5">
                                            <p>{participant.totalMinionsKilled} CS</p>
                                            <p>{(participant.goldEarned / 1000).toFixed(1)}k</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Time 2 */}
                            <div className="flex flex-col gap-1 flex-1">
                                {team2.map((participant) => (
                                    <div key={participant.puuid} className={`flex items-center justify-between p-1.5 rounded text-xs ${participant.puuid === puuid ? 'bg-white/20' : 'bg-black/20'}`}>
                                        <div className="flex items-center gap-2 w-2/5">
                                            <div className="w-8 h-8 bg-gray-700 rounded" title={participant.championName}></div> {/* Placeholder para ícone */}
                                            <p className="font-semibold truncate" title={participant.riotIdGameName}>{participant.riotIdGameName}</p>
                                        </div>
                                        <div className="text-center flex">
                                            <p className="font-semibold">{participant.kills}/{participant.deaths}/{participant.assists}</p>
                                            <p className="font-semibold">{participant.visionScore} Vision Score</p>
                                            <p className="font-semibold">{participant.wardsPlaced} Wards Placed</p>
                                            <p className="font-semibold">{participant.wardsKilled} Wards Killed</p>
                                        </div>
                                        <div className="text-right w-1/5">
                                            <p>{participant.totalMinionsKilled} CS</p>
                                            <p>{(participant.goldEarned / 1000).toFixed(1)}k</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    </div>
  )
}

export default historicos
