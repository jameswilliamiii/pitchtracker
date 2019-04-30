import React, {Component} from 'react';
import { Root } from "native-base";
import {createStackNavigator, createAppContainer} from 'react-navigation';
import RosterIndex from './src/screens/roster/index';
import RosterNew from './src/screens/roster/new';
import RosterShow from './src/screens/roster/show';
import { StyleProvider } from 'native-base';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
import { AppLoading, Font } from 'expo';

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
    loading: true,
  };

  async componentWillMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'FontAwesome': require('native-base/Fonts/FontAwesome.ttf')
    });
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return <AppLoading />;
    } else {
      return (
        <Root>
          <StyleProvider style={getTheme(material)}>
            <AppContainer />
          </StyleProvider>
        </Root>
      );
    }
  }
}
