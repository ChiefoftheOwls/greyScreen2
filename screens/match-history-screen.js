// import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { MatchHandler } from '../components/match-handler.component';

export const MatchHistory = ({ route, navigation }) => {
  const { summonerName, summonerPuuid, summonerLevel } = route.params;
  // console.log('PAGE2', summonerName);
  // console.log('PAGE2', summonerPuuid);
  // console.log('PAGE2', summonerLevel);
  const [matches, setMatches] = useState([]);

  const apiKey = 'RGAPI-ab6334f2-ad63-4fa8-b560-4a19a30bf954';
  const apiMatchesURL = `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${summonerPuuid}/ids?start=0&count=20`;
  
  useEffect(()=> {
    if(summonerPuuid){
      console.log(summonerName);
      getMatchesFromRiotApi();
      console.log(matches);
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
      setMatches(data);
    } 
    catch (error) {
      console.error(error);
    }
  };

    console.log(matches);
    return (
      <View>
      <Text>{summonerName}, Level: {summonerLevel}</Text>
     
     {!!matches && matches.map(match => (
        <MatchHandler 
          match={match}
          player={summonerName}
          apiKey={apiKey}
        />
      ))}
      
    </View>

    );

};

export default React.memo(MatchHistory);