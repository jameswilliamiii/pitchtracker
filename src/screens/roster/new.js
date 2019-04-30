import React, {Component} from 'react';

import {
  View,
  StyleSheet,
  Keyboard
} from 'react-native';
import { Button, Text, Input, Item, Toast, Card, CardItem, Label } from "native-base";
import {Col, Row} from 'react-native-easy-grid';
import { addPlayer } from '../../helpers/database';
import moment from 'moment';
import common from '../../style/common.style.js';

export default class RosterNew extends Component {
  state = {
    name: ''
  }

  static navigationOptions = {
    title: 'Add a Player',
    headerStyle: {
      backgroundColor: '#FAFAFA',
    },
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  render() {
    let disabled = this.state.name == ''
    return (
      <View style={[styles.main, common.body]}>
        <Card style={{padding: 20}}>
          <CardItem>
            <Row size={1}>
              <Col size={1}>
                <Item floatingLabel style={styles.input}>
                  <Label>Name</Label>
                  <Input
                    onChange={this._handleChange}
                    value={this.state.name}
                  />
                </Item>
              </Col>
            </Row>
          </CardItem>
          <CardItem>
            <Row size={1}>
              <Col size={1}>
                <Button primary block onPress={this._handleSubmit} disabled={disabled}>
                  <Text uppercase>Save</Text>
                </Button>
              </Col>
            </Row>
          </CardItem>
        </Card>
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
    data = { name: this.state.name, updated_at: moment().format() }
    addPlayer(data, this._clearName);
    Toast.show({
      text: this.state.name + ' added to your roster',
      type: 'success',
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
    paddingTop: 100,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: 'white'
  },
  input: {
    marginBottom: 30
  }
});
