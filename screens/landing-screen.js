import { StatusBar } from 'expo-status-bar';
import  React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { Dropdown } from 'sharingan-rn-modal-dropdown';
import { REACT_NATIVE_API_RIOT_KEY } from '../constants';


export const LandingPage = ({ navigation }) =>  {
  const [summoner, setSummoner] = useState({puuid: null});
  const [searchName, setSearchName]= useState('');
  const [region, setRegion] = useState({});

  const apiSummonerURL = `https://${region.value}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${searchName}`;

  const _onChangeText = input => {
    setSearchName(input);
  };
  const _onChangeRegion =(value) => {
    console.log(value, 'this thing');
    setRegion(regionServers.find(regionServer => regionServer.value == value));
  }
  /* regions:
    BR1, brazil
    EUN1 - EU nordic east
    EUW1 - Eu west
    JP1 - Japan
    KR - Korea
    LA1 - Latin America North
    LA2 - Latin Ameirca South
    NA1 - North America
    OC1 - Oceania
    RU - russia
    TR1 - turkey

  */
  const regionServers = [
    {
      value: 'br1',
      label: 'BR',
      area: 'americas'
    },
    {
      value: 'eun1',
      label: 'EUNE',
      area: 'europe'
    },
    {
      value: 'euw1',
      label: 'EUW',
      area: 'europe'
    },
    {
      value: 'kr',
      label: 'KR',
      area: 'asia'
    },
    {
      value: 'la1',
      label: 'LAN',
      area: 'americas'
    },
    {
      value: 'la2',
      label: 'LAS',
      area: 'americas'

    },
    {
      value: 'na1',
      label: 'NA',
      area: 'americas'
    },
    {
      value: 'oc1',
      label: 'OCE',
      area: 'asia'
    },
    {
      value: 'ru',
      label: 'RU',
      area: 'europe'
    },
    {
      value: 'tr1',
      label: 'TR',
      area: 'europe'
    },
  ];
  useEffect(()=>{
    if(summoner.puuid){
        console.log("the summoner is ", summoner.name);
        navigation.navigate('MatchHistory', {summonerName, summonerPuuid, summonerLevel, summonerIcon, region});
    }
  },[summoner.puuid]);

  const getSummonerFromRiotApi = async () => {
    try {
      const response = await fetch (apiSummonerURL, {
        headers: {
          "X-Riot-Token": REACT_NATIVE_API_RIOT_KEY
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
  const summonerIcon = summoner.profileIconId;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Enter a summoner name to Search</Text>
      <TextInput
        style={styles.input}
        onChangeText={_onChangeText}
      />
      <View style={styles.dropDown}>
        <Dropdown
          label='Region'
          data={regionServers}
          enableSearch
          value={region}
          onChange={_onChangeRegion}
        />
      </View>
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
  },
  dropDown: {
    height: 25,
    marginBottom: 50,
    marginHorizontal: 12
  }
});

export default React.memo(LandingPage);
