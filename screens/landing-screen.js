import { StatusBar } from 'expo-status-bar';
import  React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';


export const LandingPage = ({ navigation }) =>  {
  const [summoner, setSummoner] = useState({puuid: null});
  const [searchName, setSearchName]= useState('');

  const apiSummonerURL = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${searchName}`;
  const apiKey = 'RGAPI-ab6334f2-ad63-4fa8-b560-4a19a30bf954';  

  const _onChangeText = input => {
    setSearchName(input);
  };
  
  useEffect(()=>{
    if(summoner.puuid){
        console.log("the summoner is ", summoner.name);
        navigation.navigate('MatchHistory', {summonerName, summonerPuuid, summonerLevel});
    }
  },[summoner.puuid]);

  // const doSteps = async () => {
  //   getSummonerFromRiotApi(); // wait on this to finish before the second one can be called.
  // };

  const getSummonerFromRiotApi = async () => {
    try {
      const response = await fetch (apiSummonerURL, {
        headers: {
          "X-Riot-Token": apiKey
        }
      })
      const data = await response.json();
      setSummoner(data);
    } 
    catch (error) {
      console.error(error);
    }
  };
  const summonerName = summoner.name;
  const summonerPuuid = summoner.puuid;
  const summonerLevel = summoner.summonerLevel;
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Enter a summoner name to Search</Text>
      <TextInput
        style={styles.input}
        onChangeText={_onChangeText}
      />
      <Pressable 
        onPress={getSummonerFromRiotApi}
        style={styles.button}>
       
        <Text style={styles.buttonText}>Submit</Text>
      </Pressable>
      
      <StatusBar style="auto" />
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

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
    marginHorizontal: 12,
    marginBottom: 12
  },

  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white'
  },

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10
  },

  text: {
    fontWeight: '500',
    fontSize: 24,
    textAlign: 'center',
  }
});

export default React.memo(LandingPage);
