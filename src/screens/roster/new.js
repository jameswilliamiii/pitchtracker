import React, {Component} from 'react';

import {
  View,
  StyleSheet,
  Keyboard
} from 'react-native';
import { Button, Text, Input, Item, Toast } from "native-base";
import common from '../../style/common.style.js';
import { db } from '../../config';

let addPlayer = (player, callback) => {
  db.ref('/players').push({
    name: player
  });
  callback()
}

export default class RosterNew extends Component {
  state = {
    name: ''
  }

  render() {
    let disabled = this.state.name == ''
    return (
      <View style={styles.main}>
        <Item regular style={styles.input}>
          <Input
          placeholder="Player's Name"
          onChange={this._handleChange}
          value={this.state.name}
          />
        </Item>
        <Button primary block onPress={this._handleSubmit} disabled={disabled}>
          <Text>Save</Text>
        </Button>
      </View>
    );
  }

  _handleChange = e => {
    this.setState({
      name: e.nativeEvent.text
    });
  }

  _handleSubmit = () => {
    Keyboard.dismiss();
    addPlayer(this.state.name, this._clearName);
    Toast.show({
      text: this.state.name + ' added to your roster',
      duration: 3000
    });
  }

  _clearName = ()=> {
    this.setState({name: ''})
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: 'white'
  },
  input: {
    marginBottom: 30
  }
});
