import React, { useContext, useState, useEffect, useMemo } from 'react';
import { StoreContext } from '../store-context';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import apiService from '../Services/api-service';




export const ChampMasteryHandler = () => {
    const appStore = useContext(StoreContext);
    const {user: summoner} = appStore;
    const {region: region} = appStore;
    const [champMastery, setChampMastery] = useState([]);
    const apiChampMasteryUrl = `https://${region.value}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summoner.id}`;
    // const champIconUrl = `https://opgg-static.akamaized.net/images/lol/champion/${_championLookUp(mastery.championId)}.png?image=q_auto,f_webp,w_auto`;
    const champions = require('../champions.json');
    // const champs = Object.values(champions.data); // turning object into array.
    const _getMastery = async () =>{
        const apiData = await apiService.getDataFromRiotApi(apiChampMasteryUrl);
        setChampMastery(apiData.slice(0,26));
    };
    // max 20 champs, only mastery 5 and up
 
    const _championLookUpUrl = (champKey) => {
        const championName = Object.values(champions.data).find(champ => champ.key == champKey);
        return championName.id || "play an older champ please";
    };
    const _championLookUpName = (champKey) => {
        const championName = Object.values(champions.data).find(champ => champ.key == champKey);
        return championName.name || "play an older champ please";
    };
    // useMemo

    useEffect(()=> {
        _getMastery();
    }, []);

    return (
        <ScrollView>
            {champMastery.map(mastery => (
                <View style={styles.container} key={mastery.championId}>
                    <Image style={styles.champIcon} source={{uri: `https://opgg-static.akamaized.net/images/lol/champion/${_championLookUpUrl(mastery.championId)}.png?image=q_auto,f_webp,w_auto`}}/>
                    <Text>{_championLookUpName(mastery.championId)} </Text>
                    <Text>Level {mastery.championLevel}</Text>
                </View>

            ))
            }

        </ScrollView>
    );
};
const styles = StyleSheet.create({
    champIcon:{
        height: 36,
        width: 36,
        marginRight: 5,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})