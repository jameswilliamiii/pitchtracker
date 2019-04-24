import React, {Component} from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Home from './src/screens/Home';
import PitcherNew from './src/screens/pitchers/New';
import PitcherIndex from './src/screens/pitchers/Index';
import {StyleSheet, Text, View} from 'react-native';

const AppNavigator = createStackNavigator(
  {
    Home,
    PitcherNew,
    PitcherIndex
  },
  {
    initialRouteName: 'Home'
  }
);

const AppContainer = createAppContainer(AppNavigator);


export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
