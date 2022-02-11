import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { VictoryHandler } from './victory-handler.component';

export const MatchHandler = ({matchList, apiKey}) => {
    const apiMatchDataURL = `https://americas.api.riotgames.com/lol/match/v5/matches/${matchList[0]}`;
    const defaultGameState = {info: {participants: []}}
    const [game, setGame] = useState(defaultGameState);
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
        if(matchList.length){
            getGameForMatchFromRiotApi();
        }
    },[matchList]);

    return( 
    <View>
        {!!game.info.participants.length &&  
        // game.info.participants.map( participant =>(
            // <Text key={participant.summonerName}> 
            //     {participant.summonerName} has died {participant.deaths} times. {participant.win? 'winner':'loser'}
            // </Text>
            <VictoryHandler 
                // key={participant.summonerName}
                participants={game.info.participants}
            />
        // ))
        }
    </View>
    );
};

MatchHandler.propTypes = {
    matchList: PropTypes.array,
    apiKey: PropTypes.string
};
export default React.memo(MatchHandler);