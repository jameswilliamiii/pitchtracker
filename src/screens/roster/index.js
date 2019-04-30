import React, {Component} from 'react';

import {
  View,
  StyleSheet,
} from 'react-native';
import { Button, Text } from "native-base";
import common from '../../style/common.style.js';
import RosterShowComponent from '../../components/roster/show_component';
import {getPlayers} from '../../helpers/database.js';

export default class RosterIndex extends Component {
  state = {
    roster: []
  };

  componentDidMount() {
    getPlayers(this._assignInitialState);
  }

  static navigationOptions = {
    title: 'Roster',
    headerStyle: {
      backgroundColor: '#FAFAFA',
    },
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  render() {
    return (
      <View style={[styles.container, common.body]}>
        {this.state.roster.length > 0 ?
          (<RosterShowComponent roster={this.state.roster} navigation={this.props.navigation} />) : (null)
        }
        <View style={styles.btnContainer}>
          <Button block primary onPress={() => this.props.navigation.navigate('RosterNew')}>
            <Text uppercase>Add Player</Text>
          </Button>
        </View>
      </View>
    );
  }

  _assignInitialState = (snapshot) => {
    if (snapshot.val()) {
      let data = snapshot.val()
      let roster = Object.entries(data).map(arr =>
        ({
          id: arr[0],
          name: arr[1].name
        })
      )
      this.setState({roster: roster});
    } else {
      return false
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column'
  },
  btnContainer: {
    padding: 30,
    paddingTop: 15,
    paddingBottom: 20
  },
})
