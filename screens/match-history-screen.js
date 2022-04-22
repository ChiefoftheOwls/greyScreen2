import React, { useEffect, useContext } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { MatchHandler } from '../components/match-handler.component';
import { ProfileHandler } from '../components/profile-handler.component';
import { StoreContext } from '../store-context';
import apiService from '../Services/api-service';

export const MatchHistory = ({ navigation }) => {
  const appStore = useContext(StoreContext);
  const {user: summoner} = appStore;
  const {region: region} = appStore;
  const {matches: matches} = appStore;
  const apiMatchesURL = `https://${region.area}.api.riotgames.com/lol/match/v5/matches/by-puuid/${summoner.puuid}/ids?start=0&count=19`;

  useEffect(()=> {
    if(summoner.puuid){
      _getMatches();
    }
  }, [summoner.puuid])

  const _getMatches = async () => {
    appStore.setMatches(await apiService.getDataFromRiotApi(apiMatchesURL));
  }

  const _onClickSummonerInfo = () => {
    navigation.navigate('SummonerData');
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