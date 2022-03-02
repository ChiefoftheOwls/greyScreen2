import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Dimensions } from 'react-native';
import { GameDetailsHandler } from '../components/game-details-handler.component';
import { PieChart } from 'react-native-chart-kit';


export const GameDetails = ({ route, navigation }) => {
    const { game, result, player } = route.params;
    const data = [
        {
            name: 'Physical',
            damage: result.physicalDamageDealtToChampions,
            color: 'tomato',
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: 'Magical',
            damage: result.magicDamageDealtToChampions,
            color: 'purple',
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: 'True',
            damage: result.trueDamageDealtToChampions,
            color: '#F5F5F5',
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
            <Text style={styles.text}>Game Length: {_epochConverter(result.challenges.gameLength)} </Text>
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
                <Text style={styles.title}>Performance Stats</Text>
                <View style={styles.imgStatsContainer}>
                    <Text>Placed: {result.challenges.controlWardsPlaced}  </Text>
                    <Image style={styles.itemBuild} source={require('../controlWard.png')} />
                </View>
                <View style={styles.imgStatsContainer}>
                    <Image style={styles.itemBuild} source={require('../ward.png')}/>
                    <Text> {result.challenges.stealthWardsPlaced} placed, {result.wardsKilled} killed</Text>
                </View>
                <Text style={styles.text}>Damage Breakdown</Text>
                <PieChart
                    data={data}
                    width={Dimensions.get('window').width}
                    height={250}
                    chartConfig={chartConfig}
                    accessor={'damage'}
                    backgroundColor={'#696969'}
                    paddingLeft={'15'}
                />

                <Text>Solo Kills: {result.challenges.soloKills}</Text>
                <Text>Kill participation: {(result.challenges.killParticipation *100).toFixed(2)}%</Text>
                <Text>Damage dealt: {result.totalDamageDealtToChampions}</Text>
                <Text>Damage breakdown: {result.physicalDamageDealtToChampions} Physical, 
                    {result.magicDamageDealtToChampions} Magical & {result.trueDamageDealtToChampions} True </Text>
                <Text>Damage Per Minute: {result.challenges.damagePerMinute.toFixed(2)}</Text>
                <Text>Percentage of team damage: {(result.challenges.teamDamagePercentage * 100).toFixed(1)}%</Text>
                <Text>Minions killed in first 10 minutes: {result.challenges.laneMinionsFirst10Minutes}</Text>
                <Text>Turret plates taken: {result.challenges.turretPlatesTaken}</Text>
                <Text>Maximum CS advantage over lane opponent: {result.challenges.maxCsAdvantageOnLaneOpponent}</Text>
                <Text>Maximum level lead on lane opponent: {result.challenges.maxLevelLeadLaneOpponent} </Text>
                <Text>Skillshots landed: {result.challenges.skillshotsHit} </Text>
                <Text>Skillshots dodged: {result.challenges.skillshotsDodged} </Text>
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
        alignItems: 'center'

    }
    
});
export default React.memo(GameDetails);
