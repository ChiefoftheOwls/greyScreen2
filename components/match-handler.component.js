import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { VictoryHandler } from './victory-handler.component';

export const MatchHandler = ({match, pos, player, apiKey}) => {
    console.log('matchid?', match);
    const apiMatchDataURL = `https://americas.api.riotgames.com/lol/match/v5/matches/${match}`;
    const defaultGameState = {info: {participants: []}}
    const [game, setGame] = useState(defaultGameState);
    const [result, setResult] = useState({});
    const [kda, setKda] = useState(0);
    
    const getGameForMatchFromRiotApi = async () => {
        try {
            const response = await fetch (apiMatchDataURL, {
              headers: {
                "X-Riot-Token": apiKey
              }
            })
            const data = await response.json();
            setGame(data);
          } 
          catch (error) {
            console.error(error);
          }
    };
    useEffect(()=>{
        console.log('in the useEffect');
        if(!!match){
            getGameForMatchFromRiotApi();
            console.log('made it into the if');
        }
       
    },[match]);

    useEffect(()=>{
        if(!!game?.info.participants.length){
            findSummoner(game, player);
            let ans = (result.kills+result.assists)/result.deaths;
            setKda(ans.toFixed(2));
        }
        console.log('the data i need', result)

    }, [game])

    const findSummoner = (game, player) => {
        console.log('in the func');
        for (let i=0; i < game.info.participants.length; i++){
            if(game.info.participants[i].summonerName == player){
                setResult( game.info.participants[i]);
                break;
            }
            else{
                continue;
            }
        }
    }

    return( 
    <View>
        <Text>{pos +1}- {result.championName}</Text>
        <Text>queued: {result.lane}, played: {result.teamPosition}</Text>
        <Text>{result.kills} / {result.deaths} / {result.assists}</Text>
        <Text>{kda}:1 KDA</Text>
    </View>
    );
};

MatchHandler.propTypes = {
    match: PropTypes.string,
    pos: PropTypes.number,
    player: PropTypes.string,
    apiKey: PropTypes.string
};
export default React.memo(MatchHandler);