// import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { MatchHandler } from '../components/match-handler.component';

export const MatchHistory = ({ route, navigation }) => {
  const { summonerName, summonerPuuid, summonerLevel, summonerIcon } = route.params;
  // console.log('PAGE2', summonerName);
  // console.log('PAGE2', summonerPuuid);
  // console.log('PAGE2', summonerLevel);
  // console.log('PAGE2', summonerIcon);
  const [matches, setMatches] = useState([]);

  const apiKey = 'RGAPI-b79c26ac-e5b8-47ce-a4f0-49304838f9ca';
  const apiMatchesURL = `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${summonerPuuid}/ids?start=0&count=20`;
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
          "X-Riot-Token": apiKey
        }
      })
      const data = await response.json();
      const oneLessData = data.slice(0, 19);
      setMatches(oneLessData);
    } 
    catch (error) {
      console.error(error);
    }
  };

    // console.log(matches);
    return (

        <View style={styles.container}>
          <View style={styles.overview}>
            <Image style={styles.icon} source={{ uri: iconUrl }} />
            <Text style={styles.text}>{summonerName}</Text>
          </View>
          <Text style={styles.level}>{summonerLevel}</Text>
          {!!matches &&    
            <FlatList
              data={matches}
              renderItem={({item, index}) => (
                <MatchHandler 
                  match={item}
                  player={summonerName}
                  apiKey={apiKey}
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
  text: {
    fontWeight: '500',
    fontSize: 24,
    textAlign: 'center',
  },
  level:{
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '300'
  },
  icon: {
    width: 42,
    height: 42,
    borderRadius: 15,
    marginRight: 20
  }
});
export default React.memo(MatchHistory);