import { React } from 'react';
import { StyleSheet } from 'react-native';
import { LandingPage } from './screens/landing-screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { MatchHistory } from './screens/match-history-screen';
import { GameDetails } from './screens/match-details-screen';

// const apiK = process.env.REACT_APP_RIOT_API_KEY;
// console.log('THE KEY', apiK);

const Stack = createNativeStackNavigator();
 
export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name='HomeDefault' component={LandingPage} options={{title: 'GreyScreen.GG'}} />
            <Stack.Screen name='MatchHistory' component={MatchHistory} options={{title: 'Match History'}} />
            <Stack.Screen name='GameDetails' component={GameDetails} options={{title: 'Match Details'}} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
 
});
