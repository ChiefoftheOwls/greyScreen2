import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';

export const ProfileHandler = ({summonerIcon, summonerName, summonerLevel}) => {
    const iconUrl = `https://opgg-static.akamaized.net/images/profile_icons/profileIcon${summonerIcon}.jpg?image=q_auto&image=q_auto,f_webp,w_auto`;

    return(
        <View style={styles.container}>
            <Image style={styles.icon} source={{ uri: iconUrl }} />
            <Text style={styles.summonertext}>{summonerName}</Text>
            <Text style={styles.level}>{summonerLevel}</Text>
        </View>
    );
};

ProfileHandler.propTypes ={
    summonerIcon: PropTypes.number,
    summonerLevel: PropTypes.number,
    summonerName: PropTypes.string
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
