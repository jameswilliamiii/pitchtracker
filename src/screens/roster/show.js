import React, {Component} from 'react';

import { View, StyleSheet } from 'react-native';
import { Button, Text, Card, CardItem} from "native-base";
import {Col, Row} from 'react-native-easy-grid';
import {getPlayerGame, updatePlayerGame} from '../../helpers/database';
import common from '../../style/common.style.js';

import moment from 'moment';

export default class RosterShow extends Component {
  state = {
    id: this.props.navigation.getParam('id'),
    pitches: 0
  }

  static navigationOptions = {
    title: 'Track Pitches',
    headerStyle: {
      backgroundColor: '#FAFAFA',
    },
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  componentDidMount() {
    let date = moment().startOf('day')
    getPlayerGame(this.state.id, date, this._assignInitialState)
  }

  render() {
    return (
      <View style={[styles.main, common.body]}>
        <Row size={1}></Row>
        <Row size={1}>
          <Col size={1}>
            <Card>
              <CardItem>
                <Row>
                  <Col style={styles.cardItem}>
                    <Text style={styles.statsNumber}>{this.state.pitches}</Text>
                    <Text style={[styles.bodyLabel, common.bodyLabel]}>Pitch Count</Text>
                  </Col>
                </Row>
              </CardItem>
            </Card>
          </Col>
        </Row>
        <Row size={1}></Row>
        <Row size={1}>
          <Col size={1}>
            <View>
              <Button primary block onPress={()=> this._addPitch()}>
                <Text uppercase>Add Pitch</Text>
              </Button>
            </View>
          </Col>
        </Row>
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
  statsNumber: {
    alignSelf: 'center',
    fontSize: 120,
    fontWeight: 'bold'
  },
  cardItem: {
    paddingBottom: 50
  },
  bodyLabel: {
    marginTop: 5
  }
});
