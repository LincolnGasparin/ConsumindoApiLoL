"use client";

import { useState } from "react";
import Header from "./components/header";
import Rank from "./components/rank";
import { Summoner } from "./api/summoner";
import Historicos from "./components/historicos";

export default function Home() {
  const [summoner, setSummoner] = useState<Summoner | null>();

  return (
    <div className="min-h-screen text-white">
      <main className="container mx-auto p-4 md:p-8">
        <Header onSummonerSearch={setSummoner} />
        {summoner && <Rank puuid={summoner.puuid} />}
        {summoner && <Historicos puuid={summoner.puuid} />}
      </main>
    </div>
  );
}
