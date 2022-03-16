import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { MatchHandler } from '../components/match-handler.component';
import { REACT_NATIVE_API_RIOT_KEY } from '../constants';
import { ProfileHandler } from '../components/profile-handler.component';

export const MatchHistory = ({ route, navigation }) => {
  const { summonerName, summonerPuuid, summonerLevel, summonerIcon, summonerEncryptedId, region } = route.params;
  const [matches, setMatches] = useState([]);
  const apiMatchesURL = `https://${region.area}.api.riotgames.com/lol/match/v5/matches/by-puuid/${summonerPuuid}/ids?start=0&count=19`;
  const iconUrl = `https://opgg-static.akamaized.net/images/profile_icons/profileIcon${summonerIcon}.jpg?image=q_auto&image=q_auto,f_webp,w_auto`;

  useEffect(()=> {
    if(summonerPuuid){
      getMatchesFromRiotApi();
    }
  }, [summonerPuuid])

  const getMatchesFromRiotApi = async () => {
    try {
      const response = await fetch (apiMatchesURL, {
        headers: {
          "X-Riot-Token": REACT_NATIVE_API_RIOT_KEY
        }
      })
      const data = await response.json();
      setMatches(data);
    } 
    catch (error) {
      console.error(error);
    }
  };

  const _onClickSummonerInfo = () => {
    navigation.navigate('SummonerData',{region, summonerEncryptedId, summonerName, summonerLevel, summonerIcon});
  };

    return (

        <View style={styles.container}>
          <TouchableOpacity style={styles.overview} onPress={_onClickSummonerInfo}>
            <ProfileHandler
              summonerIcon={summonerIcon}
              summonerLevel={summonerLevel}
              summonerName={summonerName}
            />
          </TouchableOpacity>
          {!!matches &&    
            <FlatList
              data={matches}
              renderItem={({item, index}) => (
                <MatchHandler 
                  match={item}
                  player={summonerName}
                  region={region.area}
                />
              )
              }
              keyExtractor={(item, index)=> item + index}
            />
          }
          
       
      </View>

    );

};

const styles = StyleSheet.create({
  container:{
    backgroundColor: '#FFF5EE',
  },
  overview:{
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 10

  },
});
export default React.memo(MatchHistory);