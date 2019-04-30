import React, {Component} from 'react';

import { View, StyleSheet } from 'react-native';
import { Button, Text, Card, CardItem, Body, Toast } from "native-base";
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
    const cardStyle = this._cardStyle()
    return (
      <View style={[styles.content, common.body]}>
        <Row>
          <Col size={1} style={styles.centered}>
            <Card>
              <CardItem>
                <Body>
                  <Text style={[styles.statsNumber, cardStyle]}>{this.state.pitches}</Text>
                  <Text style={[styles.bodyLabel, common.bodyLabel]}>Pitch Count</Text>
                </Body>
              </CardItem>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col size={1} style={styles.centered}>
            <Button primary block onPress={()=> this._addPitch()}>
              <Text uppercase>Add Pitch</Text>
            </Button>
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
    this.setState({ pitches: data.pitches }, ()=> {
      if (data.pitches > 65 && data.pitches < 75) {
        Toast.show({
          text: 'Nearing daily limit!',
          type: 'danger',
          position: "bottom",
          buttonText: 'Dismiss',
          duration: 7000
        });
      } else if (data.pitches > 75) {
        Toast.show({
          text: 'Exceeded daily limit!',
          type: 'danger',
          position: "bottom",
          buttonText: 'Dismiss',
          duration: 7000
        });
      }
    }

    )
  }

  _cardStyle() {
    let pitchCount = this.state.pitches
    if (pitchCount <= 45){
      return(common.defaultCard)
    }
    else if (pitchCount <= 60){
      return(common.warningCard)
    }
    else{
      return(common.dangerCard)
    }
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'column',
    padding: 30
  },
  statsNumber: {
    alignSelf: 'center',
    fontSize: 120,
    fontWeight: 'bold'
  },
  cardItem: {
    paddingBottom: 50
  },
  centered: {
    justifyContent: 'center'
  }
});
