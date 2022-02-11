import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    container: {
        fontFamily: 'Cambria',
        // flex: 1
        // justifyContent: 'center',
        // backgroundColor: '#B',
        // borderStyle: 'solid',
    },
    
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
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    cell2: {
        marginRight: 5,
        fontStyle: 'italic',
    }

    
});

export const VictoryHandler = ({participants}) => {

   return (
       <View style={styles.container}>
           <Text style={styles.title}>Winning Team</Text>
            {participants.filter(participant => participant.win).map( participant =>(
                <View key={participant.summonerName} style={styles.rowWin}>
                        <Text style={styles.cell}>
                            {participant.summonerName}:
                        </Text>
                        <Text style={styles.cell2}>
                            {participant.championName} </Text>
                        <Text>
                            K/D/A: {participant.kills} / {participant.deaths} / {participant.assists}
                        </Text>
                </View>
                ))
            }
           <Text style={styles.title}>Losing Team</Text>
                {participants.filter(participant => !participant.win).map( participant =>(
                    <View key={participant.summonerName} style={styles.rowLose}>
                            <Text style={styles.cell}>
                                {participant.summonerName}:  
                            </Text>
                            <Text style={styles.cell2}>
                                {participant.championName}
                            </Text>
                            <Text>
                                {participant.kills} / {participant.deaths} / {participant.assists}
                            </Text>
                    </View>
                    ))
                }
       </View>
   );
};

VictoryHandler.propTypes = {
    participants: PropTypes.array
};
export default React.memo(VictoryHandler);