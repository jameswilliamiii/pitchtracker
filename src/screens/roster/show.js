import React, {Component} from 'react';

import { View, StyleSheet } from 'react-native';
import { Button, Text} from "native-base";
import {getPlayerGame, updatePlayerGame} from '../../helpers/database';
import common from '../../style/common.style.js';

import moment from 'moment';

export default class RosterShow extends Component {
  state = {
    id: this.props.navigation.getParam('id'),
    pitches: 0
  }

  componentDidMount() {
    let date = moment().startOf('day')
    getPlayerGame(this.state.id, date, this._assignInitialState)
  }

  render() {
    return (
      <View style={styles.main}>
        <View style={styles.stats}>
          <Text style={styles.statsNumber}>{this.state.pitches}</Text>
          <Text style={common.bodyLabel}>Pitch Count</Text>
        </View>
        <View>
          <Button primary block onPress={()=> this._addPitch()}>
            <Text>Add Pitch</Text>
          </Button>
        </View>
      </View>
    );
  }

  _assignInitialState = (snapshot) => {
    if (snapshot.val()) {
      this.setState({pitches: snapshot.val().pitches || 0});
    } else {
      return false
    }
  }

  _addPitch() {
    let date = moment().startOf('day')
    let data = {
      pitches: this.state.pitches + 1
    }
    updatePlayerGame(this.state.id, date, data)
    this.setState({ pitches: data.pitches })
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: 'white'
  },
  stats: {
    alignSelf: 'center',
    justifyContent: 'flex-start',
  },
  statsNumber: {
    alignSelf: 'center',
    fontSize: 120,
    fontWeight: 'bold'
  }
});
