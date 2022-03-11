import { REACT_NATIVE_API_RIOT_KEY } from "../constants";
import React, { useState, useEffect, useMemo } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

export const SummonerInfoPage = ({route}) =>{
  const { region, summonerEncryptedId } = route.params;
  const [leagues, setLeagues] = useState([]);
  const apiRankedURL = `https://${region.value}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerEncryptedId}`;

  useEffect(()=>{
    if(region && summonerEncryptedId){
      getRankedDataFromRiotApi();
    }

  }, [region, summonerEncryptedId])
  
  const getRankedDataFromRiotApi = async () => {
      try {
        const response = await fetch (apiRankedURL, {
          headers: {
            "X-Riot-Token": REACT_NATIVE_API_RIOT_KEY
          }
        })
        const data = await response.json();
        setLeagues(data);
      } 
      catch (error) {
        console.error(error);
      }
  };

  const _getRankImageUrl = (tier, rank) => {
    return `https://opgg-static.akamaized.net/images/medals/${tier}_${_convertRomanToInt(rank)}.png?image=q_auto&image=q_auto,f_webp,w_auto`
  };

  const _convertRomanToInt = (romanNum) =>{
    switch (romanNum) {
      case 'I':
        return 1;
      case 'II':
        return 2;
      case 'III':
        return 3;
      case 'IV':
        return 4;
      default:
        return 1;
    }
  };

  const flexQue = useMemo(()=>{
    return leagues.find(league => league.queueType == 'RANKED_FLEX_SR');
  }, [leagues])

  const soloQue = useMemo(()=> {
    return leagues.find(league => league.queueType == 'RANKED_SOLO_5x5');
  }, [leagues])

  return (
    <View style={styles.container}>
      {!!flexQue &&
        <View>
          <Text>Queue: {flexQue.queueType}</Text>
          <Text>Tier:  {flexQue.tier}</Text>
          <Image style={styles.rankIcon} source={{uri: _getRankImageUrl(flexQue.tier, flexQue.rank)}}/>
      </View>
      }
      {!!soloQue &&
        <View>
          <Text>Queue: {soloQue.queueType}</Text>
          <Text>Tier:  {soloQue.tier}</Text>
          <Image style={styles.rankIcon} source={{uri: _getRankImageUrl(soloQue.tier, soloQue.rank)}}/>
        </View>
      }
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5EE',
    justifyContent: 'center',
    padding: 8,
  },
  rankIcon: {
    height: 40,
    width: 40
  }

});
export default React.memo(SummonerInfoPage);
