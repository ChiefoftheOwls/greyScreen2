import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import { GameDetailsHandler } from '../components/game-details-handler.component';


export const GameDetails = ({ route, navigation }) => {
    const { game, result, player } = route.params;
    return(
        <View>
            <Text>{player}</Text>
            <Text>Game details screen yay</Text>
            <Text style={styles.title}>Winning Team</Text>
            {game.info.participants.filter(participant => participant.win).map( participant =>(
                <GameDetailsHandler
                participant={participant}
                key={participant.summonerName}
                />
                ))
            }
             <Text style={styles.title}>Losing Team</Text>
                {game.info.participants.filter(participant => !participant.win).map( participant =>(
                    <GameDetailsHandler
                    participant={participant}
                    key={participant.summonerName}
                    />
                    ))
                }
                <Text>You landed{result.challenges.skillshotsHit} skillshots and dodged {result.challenges.skillshotsDodged}skillshots</Text>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        fontFamily: 'Cambria',
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
export default React.memo(GameDetails);
