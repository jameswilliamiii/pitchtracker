import React, {Component} from 'react';
import { Root } from "native-base";
import {createStackNavigator, createAppContainer} from 'react-navigation';
import RosterIndex from './src/screens/roster/index';
import RosterNew from './src/screens/roster/new';
import RosterShow from './src/screens/roster/show';
import {StyleSheet} from 'react-native';
import { Font } from 'expo';

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
  state = {
    fontLoaded: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'FontAwesome': require('native-base/Fonts/FontAwesome.ttf')
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    return (
      <Root>
        <AppContainer />
      </Root>
    );
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
