import { REACT_NATIVE_API_RIOT_KEY } from "../constants";
import React, { useState, useEffect, useMemo } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

export const SummonerInfoPage = ({route}) =>{
  const { region, summonerEncryptedId, summonerName, summonerLevel, summonerIcon } = route.params;
  const [leagues, setLeagues] = useState([]);
  const apiRankedURL = `https://${region.value}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerEncryptedId}`;
  const iconUrl = `https://opgg-static.akamaized.net/images/profile_icons/profileIcon${summonerIcon}.jpg?image=q_auto&image=q_auto,f_webp,w_auto`;

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

  const _winRateCalculator = (wins, losses) => {
    let total = wins + losses;
    let ratio = Math.floor(wins/total * 100);
    return ratio;
  }

  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.icon} source={{ uri: iconUrl }} />
        <Text style={styles.summonertext}>{summonerName}</Text>
        <Text style={styles.level}>{summonerLevel}</Text>
      </View>
      {!!soloQue &&
        <View style={styles.rankContainer}>
          <Image style={styles.rankIcon} source={{uri: _getRankImageUrl(soloQue.tier, soloQue.rank)}}/>
          <View>
            <Text style={styles.winRate}>Ranked Solo</Text>
            <Text style={styles.rank}>{soloQue.tier} {_convertRomanToInt(soloQue.rank)}</Text>
            <Text>
              <Text>{soloQue.leaguePoints}LP</Text> <Text style={styles.winRate}>/ {soloQue.wins} wins {soloQue.losses} losses </Text>
            </Text>
            <Text style={styles.winRate}>Win Rate {_winRateCalculator(soloQue.wins, soloQue.losses)}%</Text>
          </View>
        </View>
      }
      {!!flexQue &&
        <View style={styles.rankContainer}>
          <Image style={styles.rankIcon} source={{uri: _getRankImageUrl(flexQue.tier, flexQue.rank)}}/>
          <View>
            <Text style={styles.winRate}>Ranked Flex</Text>
            <Text style={styles.rank}>{flexQue.tier} {_convertRomanToInt(flexQue.rank)}</Text>
            <Text>{flexQue.leaguePoints}LP <Text style={styles.winRate}>/ {flexQue.wins} wins {flexQue.losses} losses</Text></Text>
            <Text style={styles.winRate}>Win Rate {_winRateCalculator(flexQue.wins, flexQue.losses)}%</Text>
          </View>
        </View>
      }
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5EE',
    alignItems: 'center',
    padding: 8,
  },
  rankIcon: {
    height: 80,
    width: 80
  },
  level:{
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '300'
  },
  icon: {
    width: 62,
    height: 62,
    borderRadius: 15,
    marginRight: 5
  },
  summonertext: {
    fontWeight: '500',
    fontSize: 24,
    textAlign: 'center',
  },
  rankContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  winRate: {
    color: '#696969'
  },
  text: {
    fontSize: 16,
  },
  rank: {
    color: '#1E90FF',
    fontWeight: 'bold'
  }

});
export default React.memo(SummonerInfoPage);
