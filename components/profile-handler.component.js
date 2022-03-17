import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { StoreContext } from '../store-context';

export const ProfileHandler = () => {
    const appStore = useContext(StoreContext);
    const {user: summoner} = appStore; // destructure user into summoner
    const iconUrl = `https://opgg-static.akamaized.net/images/profile_icons/profileIcon${summoner.profileIconId}.jpg?image=q_auto&image=q_auto,f_webp,w_auto`;

    return(
        <View style={styles.container}>
            <Image style={styles.icon} source={{ uri: iconUrl }} />
            <Text style={styles.summonertext}>{summoner.name}</Text>
            <Text style={styles.level}>{summoner.summonerLevel}</Text>
        </View>
    );
};

const styles= StyleSheet.create({
    icon: {
        width: 62,
        height: 62,
        borderRadius: 15,
        marginRight: 5
    },
    summonertext: {
        fontWeight: '500',
        fontSize: 24,
        textAlign: 'center',
    },
    container:{
        alignItems: 'center'
    }
});
export default React.memo(ProfileHandler);
