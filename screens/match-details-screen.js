import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Dimensions } from 'react-native';
import { GameDetailsHandler } from '../components/game-details-handler.component';
import { PieChart } from 'react-native-chart-kit';


export const GameDetails = ({ route, navigation }) => {
    const { game, result } = route.params;
    const data = [
        {
            name: 'Physical',
            damage: result.physicalDamageDealtToChampions,
            color: '#FF0000',
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: 'Magical',
            damage: result.magicDamageDealtToChampions,
            color: '#4169E1',
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: 'True',
            damage: result.trueDamageDealtToChampions,
            color: '#D3D3D3',
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        }
    ];
    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };

    const _epochConverter = (secs) => {
        let minutes = Math.floor(secs/60);
        let seconds = ((secs % 60)).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }
    return(
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Victory</Text>
            {game.info.participants.filter(participant => participant.win).map( participant =>(
                <GameDetailsHandler
                participant={participant}
                key={participant.summonerName}
                />
                ))
            }
             <Text style={styles.title}>Defeat</Text>
                {game.info.participants.filter(participant => !participant.win).map( participant =>(
                    <GameDetailsHandler
                    participant={participant}
                    key={participant.summonerName}
                    />
                    ))
                }
                
                <Text style={styles.title}>Damage Breakdown</Text>
                <Text style={styles.text}>{result.totalDamageDealtToChampions} damage dealt in {_epochConverter(result.challenges.gameLength)} min of game time</Text>
                <PieChart
                    data={data}
                    width={Dimensions.get('window').width}
                    height={250}
                    chartConfig={chartConfig}
                    accessor={'damage'}
                    backgroundColor={'#FFF5EE'}
                    paddingLeft={'15'}
                />
                <Text style={styles.title}>Performance Stats</Text>

                <View> 
                    <View style={styles.cellView}>
                        <View style={styles.imgStatsContainer}>
                            <Text style={styles.wardText}>Placed: {result.challenges.controlWardsPlaced}  </Text>
                            <Image style={styles.itemBuild} source={require('../controlWard.png')} />
                        </View>
                        <View style={styles.imgStatsContainer}>
                            <Image style={styles.itemBuild} source={require('../ward.png')}/>
                            <Text style={styles.wardText}> {result.challenges.stealthWardsPlaced} placed, {result.wardsKilled} killed</Text>
                        </View>
                    </View>

                    <View style={styles.cellView}>
                        <Text style={styles.cell}>Solo Kills: {result.challenges.soloKills}</Text>
                        <Text style={styles.cell2}>Kill participation: {(result.challenges.killParticipation *100).toFixed(2)}%</Text>

                        <Text style={styles.cell2}>{result.challenges.damagePerMinute.toFixed(2)} DPM</Text>
                        <Text style={styles.cell}>{(result.challenges.teamDamagePercentage * 100).toFixed(1)}% of team damage</Text>

                        <Text style={styles.cell}>Turret plates taken: {result.challenges.turretPlatesTaken}</Text>
                        <Text style={styles.cell2}>Max level lead: {result.challenges.maxLevelLeadLaneOpponent} </Text>

                        <Text style={styles.cell2}>Max CS advantage: {result?.challenges.maxCsAdvantageOnLaneOpponent}</Text>
                        <Text style={styles.cell}>{result.challenges.laneMinionsFirst10Minutes} cs first 10 mins</Text>

                        <Text style={styles.cell}>Skillshots landed: {result.challenges.skillshotsHit} </Text>
                        <Text style={styles.cell2}>Skillshots dodged: {result.challenges.skillshotsDodged} </Text>
                    </View>
                    
                </View>
        </ScrollView>
    );

};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF5EE',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#FFE4C4',
    },  
    itemBuild: {
        height: 22,
        width: 22
    },
    text: {
        fontWeight: '500',
        fontSize: 16,
    },
    imgStatsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0E68C',
        padding: 5,
        borderRadius: 10,
        overflow:'hidden',
        margin: 5

    },
    cellView: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        // justifyContent: 'space-between'
    },
    cell: {
        backgroundColor: '#4169E1',
        padding: 5,
        borderRadius: 10,
        overflow: 'hidden',
        margin: 5,
        fontWeight: 'bold',
        color: '#DCDCDC'

    },
    cell2: {
        backgroundColor: '#20B2AA',
        padding: 5,
        borderRadius: 10,
        overflow: 'hidden',
        margin: 5,
        fontWeight: 'bold',
        color: '#FFFACD',
    },
    wardText: {
        fontWeight: 'bold',
        color: '#FFA07A'
    }
});
export default React.memo(GameDetails);
// {
//     Object.entries(result.challenges).map(([challengeName, challenge],index) => (
//         <Text style={index%2 == 0 ? styles.cell : styles.cell2}>
//             {challengeName}: {challenge}
//         </Text>
//     ))
//  }
// using a map to alternate styles using an object and its key value pairs