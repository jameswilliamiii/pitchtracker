import React, {Component} from 'react';

import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  TextInput,
  Alert
} from 'react-native';
import common from '../../style/common.style.js';
import { db } from '../../config';

let addPitcher = (pitcher, callback) => {
  db.ref('/pitchers').push({
    name: pitcher
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
        <TextInput
          style={common.input}
          onChange={this._handleChange}
          value={this.state.name}
          placeholder='Pitchers Name'
          placeholderTextColor='#c0c0ff'
          />
        <TouchableHighlight
          style={disabled ? [common.btn, common.btnDisabled] : common.btn}
          underlayColor='white'
          onPress={this._handleSubmit}
          disabled={disabled}
        >
          <Text style={common.btnText}>Add</Text>
        </TouchableHighlight>
      </View>
    );
  }

  _handleChange = e => {
    this.setState({
      name: e.nativeEvent.text
    });
  }

  _handleSubmit = () => {
    addPitcher(this.state.name, this._clearName);
    Alert.alert(
      this.state.name + ' added to your roster',
      null
    )
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
  }
});
