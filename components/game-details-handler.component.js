import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export const GameDetailsHandler = ({participant}) => {
    return (
            <View key={participant.summonerName} style={participant.win? styles.rowWin: styles.rowLose}>
                <Text style={styles.cell}>
                    {participant.summonerName}:
                </Text>
                <Text style={styles.cell2}>
                    {participant.championName} </Text>
                <Text>
                    K/D/A: {participant.kills} / {participant.deaths} / {participant.assists}
                </Text>
            </View>

    );
};

const styles = StyleSheet.create({
 
    cell : {
        fontWeight: 'bold',
        marginRight: 10,
    },
    rowWin: {
        justifyContent:'flex-start',
        flexDirection: 'row',
        backgroundColor: 'skyblue',
        padding: 5,
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 1
    },
    rowLose: {
        padding: 5,
        backgroundColor: 'tomato',
        flexDirection: 'row',
        justifyContent:'flex-end',
        alignItems: 'flex-end',
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 1,
    },
    cell2: {
        marginRight: 5,
        fontStyle: 'italic',
    }
});

GameDetailsHandler.propTypes = {
    participant: PropTypes.object
}