import React, {Component} from 'react';

import { View, StyleSheet } from 'react-native';
import { Button, Text} from "native-base";
import {db} from '../../config';

export default class RosterShow extends Component {
  state = {
    id: this.props.navigation.getParam('id'),
    pitches: 0
  }

  componentDidMount() {
    let playersRef = db.ref('/players/' + this.state.id)
    playersRef.on('value', snapshot => {
      if (snapshot) {
        this.setState({pitches: snapshot.val().pitches || 0});
      } else {
        return false
      }
    });
  }

  render() {
    return (
      <View style={styles.main}>
        <Text>Pitch Count: {this.state.pitches}</Text>

        <Button primary onPress={()=> this._addPitch()}>
          <Text>Add Pitch</Text>
        </Button>
      </View>
    );
  }

  _addPitch() {
    let pitches = this.state.pitches + 1
    db.ref('/players/' + this.state.id).update({
      pitches: pitches
    });
    this.setState({ pitches: pitches })
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
