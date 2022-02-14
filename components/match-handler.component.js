import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { VictoryHandler } from './victory-handler.component';

export const MatchHandler = ({match, player, apiKey}) => {
    console.log('matchid?', match);
    const apiMatchDataURL = `https://americas.api.riotgames.com/lol/match/v5/matches/${match}`;
    const defaultGameState = {info: {participants: []}}
    const [game, setGame] = useState(defaultGameState);
    const [result, setResult] = useState({});
    
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
        if(match != undefined){
            getGameForMatchFromRiotApi();
        }
       
    },[match]);

    useEffect(()=>{
        if(!!game?.info.participants.length){
            findSummoner(game, player);
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
        <Text>{result.deaths}</Text>

         {/* {!!result &&  
            game.info.map( participant =>(
            <Text key={participant.summonerName}> 
                {participant.summonerName} has died {participant.deaths} times. {participant.win? 'winner':'loser'}
            </Text>
           
        ))
        }  */}
    </View>
    );
};

MatchHandler.propTypes = {
    match: PropTypes.string,
    player: PropTypes.string,
    apiKey: PropTypes.string
};
export default React.memo(MatchHandler);