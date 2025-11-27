# LOLZIM - Gerenciador de Informações de League of Legends

Este é um projeto simples em Next.js para consultar informações de jogadores de League of Legends, como elo e histórico de partidas.

## ⚠️ Aviso Importante sobre a Chave da API

A chave da API da Riot Games utilizada neste projeto é uma **chave de desenvolvimento temporária**. Ela possui uma validade de apenas **24 horas**. Após esse período, a aplicação deixará de funcionar e retornará erros ao tentar buscar os dados.

Para que a aplicação volte a funcionar, é necessário gerar uma nova chave no [Portal de Desenvolvedores da Riot Games](https://developer.riotgames.com/) e substituí-la no código.

### Como atualizar a chave da API:

1.  Acesse o [Portal de Desenvolvedores da Riot Games](https://developer.riotgames.com/) e faça login com sua conta da Riot.
2.  Gere uma nova chave de desenvolvimento (Development API Key).
3.  Copie a nova chave gerada.
4.  Abra o arquivo `app/api/api.tsx` no projeto.
5.  Substitua o valor da constante `api_key` pela nova chave que você copiou.

```typescript
// em app/api/api.tsx
const api_key = "SUA_NOVA_CHAVE_AQUI";
```

## Como a Aplicação Funciona

O processo de consulta e exibição das informações do jogador é dividido em algumas etapas:

1.  **Busca do Jogador**:
    *   O usuário digita o Riot ID do jogador (no formato `NomeDeJogo#TAG`) na página inicial e clica em "Pesquisar".
    *   A aplicação faz uma primeira chamada à API da Riot para obter os dados da conta do jogador, incluindo o `puuid`, que é um identificador único e essencial para as próximas consultas.
    *   Esta chamada utiliza o endpoint: `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/{gameName}/{tagLine}`.

2.  **Busca de Elo (Rank)**:
    *   Com o `puuid` em mãos, a aplicação faz uma segunda chamada para a API, desta vez para buscar as informações de elo (rank) do jogador nas filas ranqueadas.
    *   Endpoint utilizado: `https://br1.api.riotgames.com/lol/league/v4/entries/by-puuid/{puuid}`.

3.  **Busca do Histórico de Partidas**:
    *   Usando o mesmo `puuid`, o sistema busca uma lista com os IDs das últimas partidas do jogador.
    *   Endpoint: `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/{puuid}/ids`.
    *   Em seguida, para cada ID de partida retornado, a aplicação faz uma nova chamada para obter os detalhes completos daquela partida (jogadores, estatísticas, itens, etc.).
    *   Endpoint de detalhes: `https://americas.api.riotgames.com/lol/match/v5/matches/{matchId}`.

4.  **Exibição**:
    *   Todas as informações coletadas são processadas e exibidas em componentes React na tela, mostrando o nome do invocador, seu elo e os detalhes do seu histórico de partidas.

## Tecnologias Utilizadas

*   **Next.js (React)**
*   **TypeScript**
*   **Axios** para as chamadas à API
*   **Tailwind CSS** para estilização

---
<<<<<<< HEAD
*Este projeto foi criado para fins de estudo e demonstração do consumo de APIs.*
=======
*Este projeto foi criado para fins de estudo e demonstração do consumo de APIs.*
>>>>>>> cdb492f45fc2f0c2462b468fe0c12231a5c12bf3
