import React, {Component} from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import RosterIndex from './src/screens/roster/index';
import RosterNew from './src/screens/roster/new';
import RosterShow from './src/screens/roster/show';
import {StyleSheet, Text, View} from 'react-native';

const AppNavigator = createStackNavigator(
  {
    RosterIndex,
    RosterNew,
    RosterShow
  },
  {
    initialRouteName: 'RosterIndex'
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
