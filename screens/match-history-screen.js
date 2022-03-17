import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { MatchHandler } from '../components/match-handler.component';
import { REACT_NATIVE_API_RIOT_KEY } from '../constants';
import { ProfileHandler } from '../components/profile-handler.component';
import { StoreContext } from '../store-context';

export const MatchHistory = ({ navigation }) => {
  const [matches, setMatches] = useState([]);
  const appStore = useContext(StoreContext);
  const {user: summoner} = appStore;
  const {region: region} = appStore;
  const apiMatchesURL = `https://${region.area}.api.riotgames.com/lol/match/v5/matches/by-puuid/${summoner.puuid}/ids?start=0&count=19`;

  useEffect(()=> {
    if(summoner.puuid){
      getMatchesFromRiotApi();
    }
  }, [summoner.puuid])

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
    navigation.navigate('SummonerData',{region});
  };

    return (

        <View style={styles.container}>
          <TouchableOpacity style={styles.overview} onPress={_onClickSummonerInfo}>
            <ProfileHandler/>
          </TouchableOpacity>
          {!!matches &&    
            <FlatList
              data={matches}
              renderItem={({item, index}) => (
                <MatchHandler 
                  match={item}
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