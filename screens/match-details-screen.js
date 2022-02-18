import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import { GameDetailsHandler } from '../components/game-details-handler.component';


export const GameDetails = ({ route, navigation }) => {
    const { game, result, player } = route.params;
    const _epochConverter = (secs) => {
        let minutes = Math.floor(secs/60);
        let seconds = ((secs % 60)).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }
    return(
        <View>
            <Text>{player}</Text>
            <Text>Total game time: {_epochConverter(result.challenges.gameLength)} </Text>
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
                <Text>Control Wards Placed: {result.challenges.controlWardsPlaced}</Text>
                <Text>Trinket Wards Placed: {result.challenges.stealthWardsPlaced}</Text>
                <Text>Solo Kills: {result.challenges.soloKills}</Text>
                <Text>Kill participation: {result.challenges.killParticipation.toFixed(2) *10 *10}%</Text>
                <Text>Percentage of team damage: {result.challenges.teamDamagePercentage.toFixed(3) * 10 * 10}%</Text>
                <Text>Minions killed in first 10 minutes: {result.challenges.laneMinionsFirst10Minutes}</Text>
                <Text>Turret plates taken: {result.challenges.turretPlatesTaken}</Text>
                <Text>Maximum CS advantage over lane opponent: {result.challenges.maxCsAdvantageOnLaneOpponent}</Text>
                <Text>Maximum level lead on lane opponent: {result.challenges.maxLevelLeadLaneOpponent} </Text>
                <Text>Skillshots landed: {result.challenges.skillshotsHit} </Text>
                <Text>Skillshots dodged: {result.challenges.skillshotsDodged} </Text>
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
