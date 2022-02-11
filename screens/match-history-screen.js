// import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
// import { MatchHandler } from '../components/match-handler.component';

export const MatchHistory = ({ route, navigation }) => {
  const { summonerName, summonerPuuid } = route.params;
  console.log('PAGE2', summonerName);
  console.log('PAGE2', summonerPuuid);
  const [matches, setMatches] = useState([]);

  const apiKey = process.env.REACT_APP_API_KEY;
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
      // console.log("should be a list of matches", data);
      setMatches(data);
    } 
    catch (error) {
      console.error(error);
    }
  };
    return (
      <View>
    {/* // <MatchHandler 
    //     matchList={matches}
    //     apiKey={apiKey} 
    //     /> */}
      <Text>{summonerName}</Text>
    </View>

    );

};

export default React.memo(MatchHistory);