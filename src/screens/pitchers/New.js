import React, {Component} from 'react';

import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  TextInput,
  Alert
} from 'react-native';

import { db } from '../../config';

let addPitcher = (pitcher, callback) => {
  db.ref('/pitchers').push({
    name: pitcher
  });
  callback()
}

export default class PitcherNew extends Component {
  state = {
    name: ''
  }

  render() {
    return (
      <View style={styles.main}>
        <TextInput
          style={styles.pitcherInput}
          onChange={this._handleChange}
          value={this.state.name}
          placeholder='Pitchers Name'
          placeholderTextColor='#c0c0ff'
          />
        <TouchableHighlight
          style={this.state.name == '' ? [styles.button, styles.buttonDisabled] : styles.button}
          underlayColor='white'
          onPress={this._handleSubmit}
        >
          <Text style={styles.buttonText}>Add</Text>
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

let $purple = '#5151fb'
let $lightPurple = '#c0c0ff'

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: 'white'
  },
  pitcherInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: $purple,
    borderRadius: 8,
    color: $purple,
    textAlign: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: $purple,
    borderColor: $purple,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 25,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonDisabled: {
    backgroundColor: $lightPurple,
    borderColor: $lightPurple
  }
});
