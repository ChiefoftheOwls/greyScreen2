// import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import { MatchHandler } from '../components/match-handler.component';

export const MatchHistory = ({ route, navigation }) => {
  const { summonerName, summonerPuuid, summonerLevel } = route.params;
  // console.log('PAGE2', summonerName);
  // console.log('PAGE2', summonerPuuid);
  // console.log('PAGE2', summonerLevel);
  const [matches, setMatches] = useState([]);

  const apiKey = 'RGAPI-a5de5c60-f1af-4bc8-b7cb-e7b7cd89427f';
  const apiMatchesURL = `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${summonerPuuid}/ids?start=0&count=20`;
  
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
        <Text style={styles.text}>{summonerName}</Text>
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
  text: {
    fontWeight: '500',
    fontSize: 24,
    textAlign: 'center',
  },
  level:{
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '300'
  }

});
export default React.memo(MatchHistory);