import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';

export const GameDetailsHandler = ({participant}) => {
    const champIconUrl = `https://opgg-static.akamaized.net/images/lol/champion/${participant?.championName}.png?image=q_auto,f_webp,w_auto`;

    return (
        <View style={participant.win? styles.rowWin: styles.rowLose}>
            <Image style={styles.champIcon} source={{uri: champIconUrl}}/>
            <View style={{flex: 1}}>
                <View key={participant.summonerName} style={styles.spaceBtwRow}>
                    <Text style={styles.summoner}>
                        {participant.summonerName}
                    </Text>
                    <Text style={styles.killRatio}>
                    {participant.kills} <Text style={styles.slash}>/</Text> {participant.deaths} <Text style={styles.slash}>/</Text> {participant.assists}
                    </Text>
                </View>

                <View style={styles.spaceBtwRow}>
                    <View style={styles.itemStyle}>
                        <Image style={styles.goldIcon} source={require('../coin.png')} />
                        <Text style={styles.gold}>{(participant.goldEarned / 1000).toFixed(1)}k</Text>
                    </View>
                    <View style={styles.itemStyle}>
                        <Image style={styles.itemBuild} source={{uri: `https://opgg-static.akamaized.net/images/lol/item/${participant.item0}.png?image=q_auto,f_webp,w_auto`}} />
                        <Image style={styles.itemBuild} source={{uri: `https://opgg-static.akamaized.net/images/lol/item/${participant.item1}.png?image=q_auto,f_webp,w_auto`}} />
                        <Image style={styles.itemBuild} source={{uri: `https://opgg-static.akamaized.net/images/lol/item/${participant.item2}.png?image=q_auto,f_webp,w_auto`}} />
                        <Image style={styles.itemBuild} source={{uri: `https://opgg-static.akamaized.net/images/lol/item/${participant.item3}.png?image=q_auto,f_webp,w_auto`}} />
                        <Image style={styles.itemBuild} source={{uri: `https://opgg-static.akamaized.net/images/lol/item/${participant.item4}.png?image=q_auto,f_webp,w_auto`}} />                   
                        <Image style={styles.itemBuild} source={{uri: `https://opgg-static.akamaized.net/images/lol/item/${participant.item5}.png?image=q_auto,f_webp,w_auto`}} />
                        <Image style={styles.itemBuild} source={{uri: `https://opgg-static.akamaized.net/images/lol/item/${participant.item6}.png?image=q_auto,f_webp,w_auto`}} />
                    </View>
                </View>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
 
    summoner : {
        fontWeight: '500',
        marginRight: 5,
    },
    rowWin: {
        justifyContent:'flex-start',
        flexDirection: 'row',
        backgroundColor: 'skyblue',
        padding: 5,

    },
    rowLose: {
        padding: 5,
        backgroundColor: 'tomato',
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
    },
    killRatio: {
        marginRight: 5
    },
    champIcon:{
        height: 36,
        width: 36,
        marginRight: 5,
    },
    gold:{
        marginRight: 10,
        color: '#696969'
    },
    goldIcon: {
        height: 10,
        width: 10,
        marginRight: 2
    },
    slash: {
        color: '#696969',
    },
    itemBuild: {
        height: 22,
        width: 22
    },
    spaceBtwRow: {
        justifyContent:'space-between',
        flexDirection:'row'
    },
    itemStyle: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});

GameDetailsHandler.propTypes = {
    participant: PropTypes.object
}