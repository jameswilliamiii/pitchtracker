import React, {Component} from 'react';

import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet
} from 'react-native';
import common from '../../style/common.style.js';
import {db} from '../../config';

export default class RosterShow extends Component {
  state = {
    id: this.props.navigation.getParam('id'),
    strikes: 0,
    balls: 0
  }

  componentDidMount() {
    let playersRef = db.ref('/players/' + this.state.id)
    playersRef.on('value', snapshot => {
      if (snapshot) {
        this.setState({
          strikes: snapshot.val().strikes || 0,
          balls: snapshot.val().balls || 0
        });
      } else {
        return false
      }
    });
  }

  render() {
    let pitchCount = this._findPitchCount()
    return (
      <View style={styles.main}>
        <Text>Strikes: {this.state.strikes}</Text>
        <Text>Balls: {this.state.balls}</Text>
        <Text>Pitch Count: {pitchCount}</Text>
        <TouchableHighlight
          style={common.btn}
          underlayColor='white'
          onPress={()=> this._addStrike()}
        >
          <Text style={common.btnText}>Strike</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={common.btn}
          underlayColor='white'
          onPress={()=> this._addBall()}
        >
          <Text style={common.btnText}>Ball</Text>
        </TouchableHighlight>
      </View>
    );
  }

  _addStrike() {
    let strikes = this.state.strikes + 1
    db.ref('/players/' + this.state.id).update({
      strikes: strikes
    });
    this.setState({ strikes: strikes })
  }

  _addBall() {
    let balls = this.state.balls + 1
    db.ref('/players/' + this.state.id).update({
      balls: balls
    });
    this.setState({balls: balls})
  }

  _findPitchCount() {
    return this.state.strikes + this.state.balls
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: 'white'
  }
});
