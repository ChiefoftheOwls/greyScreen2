import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';


export const MatchHandler = ({match, player, apiKey}) => {
    // console.log('matchid?', match);
    const apiMatchDataURL = `https://americas.api.riotgames.com/lol/match/v5/matches/${match}`;
    const defaultGameState = {info: {participants: []}}
    const [game, setGame] = useState(defaultGameState);
    const [result, setResult] = useState(null);
    const navigation = useNavigation();
    // const kda = useMemo(()=> {
    //     if(result){
    //         return (result.kills +result.assists)/result.deaths;
    //     }
    // }, [result]);

    
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
        if(!!match){
            getGameForMatchFromRiotApi();
        }
    },[match]);

    useEffect(()=>{
        if(!!game?.info.participants.length){
            findSummoner(game, player);
        }
    }, [game])

    const _onClickDetails = () => {
        navigation.navigate('GameDetails',{game, result, player});
    }

    const findSummoner = (game, player) => {
        setResult(game.info.participants.find(participant => participant.summonerName == player ));
    }

    return( 
        <View style={styles.container}>
            {!!result &&
                <View style={result.win ? styles.win : styles.lose}>
                    <TouchableOpacity onPress={_onClickDetails}>
                        <Text style={styles.champ}>{result.championName}</Text>
                        <Text>Level {result.champLevel}, played: {result.individualPosition}</Text>
                        <Text style={styles.text2}>vision score: {result.visionScore}</Text>
                        <Text style={styles.killDeathsAssists}>{result.kills} / {result.deaths} / {result.assists}</Text>
                        <Text style={styles.killRatio}>{result?.challenges.kda.toFixed(2)}:1 KDA</Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
    );
};

MatchHandler.propTypes = {
    match: PropTypes.string,
    player: PropTypes.string,
    apiKey: PropTypes.string,
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF5EE',
        justifyContent: 'center',
        padding: 8,
    },
    champ: {
     fontWeight: '500',
    },
    text2: {
        fontStyle: 'italic',
    },
    killDeathsAssists:{
      fontWeight: 'bold',
    },
    lose: {
        backgroundColor: 'tomato',
        padding:8,
    },
    win: {
        backgroundColor: 'skyblue',
        padding:8,
    },
    killRatio: {
        color: '#696969',
    }
  
  });
export default React.memo(MatchHandler);