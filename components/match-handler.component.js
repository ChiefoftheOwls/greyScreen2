import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';


export const MatchHandler = ({match, player, apiKey}) => {
    // console.log('matchid?', match);
    const apiMatchDataURL = `https://americas.api.riotgames.com/lol/match/v5/matches/${match}`;
    const defaultGameState = {info: {participants: []}}
    const [game, setGame] = useState(defaultGameState);
    const [result, setResult] = useState(null);
    const navigation = useNavigation();
    const champIconUrl = `https://opgg-static.akamaized.net/images/lol/champion/${result?.championName}.png?image=q_auto,f_webp,w_auto`;
    const keystoneUrl = `https://opgg-static.akamaized.net/images/lol/perk/${result?.perks.styles[0].selections[0].perk}.png?image=q_auto,f_webp,w_auto`;
    const secondaryRuneUrl = `https://opgg-static.akamaized.net/images/lol/perkStyle/${result?.perks.styles[1].style}.png?image=q_auto,f_webp,w_auto`;
  
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
                    <TouchableOpacity style={styles.touchable} onPress={_onClickDetails}>
                        <View >
                            <Text style={styles.champ}>{result.championName}</Text>
                            <Text>Level {result.champLevel}, played: {result.individualPosition}</Text>
                            <Text style={styles.text2}>vision score: {result.visionScore}</Text>
                            <Text style={styles.killDeathsAssists}>{result.kills} / {result.deaths} / {result.assists}</Text>
                            <Text style={styles.killRatio}>{result?.challenges.kda.toFixed(2)}:1 KDA</Text>
                        </View>
                        <View  style={styles.runeContainer}>
                            <View>
                                <Image style={styles.runes} source={{uri: keystoneUrl}}/>
                                <Image style={styles.runes} source={{uri: secondaryRuneUrl}}/>
                            </View>
                            <Image style={styles.champIcon} source={{uri: champIconUrl}}/>
                        </View>
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
     fontWeight: 'bold',
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
    },
    champIcon:{
        height: 56,
        width: 56,
        borderRadius: 50
    },
    touchable: {
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    runes: {
        height: 22,
        width: 22,
        borderColor: 'black',
        borderWidth: 3,
        backgroundColor: 'black',
        borderRadius: 8
    },
    runeContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    }
  
  });
export default React.memo(MatchHandler);