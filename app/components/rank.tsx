"use client";

import { useEffect, useState } from "react";
import { buscarRank, Ranked} from "../api/searchRank";


function Rank( { puuid }: { puuid: string }) {

    const [ranked , setRanked] = useState<Ranked[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);


    useEffect(() => {

      const puuid = sessionStorage.getItem("summonerPuuid");
        async function fetchRank() {
            setLoading(true);
            setError(null);
            try {
                const rankData = await buscarRank(puuid || '');
                setRanked(rankData);
            } catch (err) {
                setError("Não foi possível carregar os dados de ranqueada.");
                setRanked([]);
            } finally {
                setLoading(false);
            }
        }
        fetchRank();
    }, []);

  return (
   <section className="mt-8">
        {loading && <p className="text-center">Carregando ranqueadas...</p>}
        {error && <p className="text-center text-red-400">{error}</p>}

        {ranked.length > 0 && (
            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold">Ranqueadas</h2>
            </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {ranked.map((rank) => (
                 <div key={rank.queueType} className="p-6 bg-gray-900/50 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
                    <h3 className="text-2xl font-bold mb-2">{rank.queueType === 'RANKED_SOLO_5x5' ? 'Ranqueada Solo/Duo' : 'Ranqueada Flex'}</h3>
                    <p className="text-xl text-cyan-400 mb-4">{rank.tier} {rank.rank}</p> 
                    <div className="grid grid-cols-2 gap-4 text-lg">
                        <p><span className="font-semibold">LP:</span> {rank.leaguePoints}</p>
                        <p><span className="font-semibold">Vitórias:</span> <span className="text-green-400">{rank.wins}</span></p>
                        <p><span className="font-semibold">Derrotas:</span> <span className="text-red-400">{rank.losses}</span></p>
                        <p><span className="font-semibold">Winrate:</span> {rank.wins + rank.losses > 0 ? ((rank.wins / (rank.wins + rank.losses)) * 100).toFixed(1) : 0}%</p>
                        <p><span className="font-semibold">Hot Streak:</span> {rank.hotStreak ? 'Sim' : 'Não'}</p>
                    </div>
                </div>
            ))}
        </div>
   </section>
  )
}

export default Rank;
