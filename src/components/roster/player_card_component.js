import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, CardItem, Text, Icon } from "native-base";
import { Col, Row } from 'react-native-easy-grid';
import PropTypes from 'prop-types';
import common from '../../style/common.style.js'
import moment from 'moment';
import {getPlayerGame, getPlayerGamesForWeek} from '../../helpers/database';

export default class PlayerCardComponent extends Component {

  static propTypes = {
    player: PropTypes.object.isRequired
  }

  state = {
    todayPitchCount: 0,
    weekPitchCount: 0
  }

  componentDidMount() {
    this._getTodayPitchCount()
    this._getWeekPitchCount()
  }

  render() {
    const cardStyle = this._getCardStyle()
    let icon = this._getIcon(cardStyle)
    let pitchCount = this._getPitchCount()
    return (
      <Card>
        <CardItem>
          <Col onPress={() => this.props.flip()} activeOpacity={100}>
            <Row size={1} style={styles.cardHeader}>
              <Col>
                <Text style={[styles.name]}>
                  {this.props.player.name}
                </Text>
              </Col>
            </Row>
            <Row size={3}>
              <Col>
                <Text style={[cardStyle, styles.statBody]}>{pitchCount}</Text>
              </Col>
            </Row>
            <Row size={1} style={styles.bottomRow}>
              <Col></Col>
              <Col>
                <Text style={[common.bodyLabel]}>
                  {
                    this.props.today?
                      'Today'
                    :
                      'Week'
                  }
                </Text>
              </Col>
              <Col>
                {icon}
              </Col>
            </Row>
          </Col>
        </CardItem>
      </Card>
    );
  }

  _getIcon(cardStyle) {
    if (this.props.today){
      return(
        <Icon
          name="ios-add-circle-outline"
          onPress={() => this.props.navigation.navigate('RosterShow', { id: this.props.player.id })}
          style={[styles.add, cardStyle]}
        />
      )
    } else {
      return(null)
    }
  }

  _getPitchCount() {
    return(this.props.today ? this.state.todayPitchCount : this.state.weekPitchCount)
  }

  _getTodayPitchCount() {
    let date = moment().startOf('day')
    getPlayerGame(this.props.player.id, date, snapshot => {
      todayPitchCount = snapshot.val() ? snapshot.val().pitches : 0
      this.setState({ todayPitchCount: todayPitchCount || 0 })
    })
  }

  _getWeekPitchCount() {
    getPlayerGamesForWeek(this.props.player.id, snapshot => {
      let data = snapshot.val() || {}
      let total = 0
      let keys = Object.keys(data).filter( key => moment(Number(key)).isSameOrAfter(moment().subtract(7, 'days')) )
      for (var key of keys) {
        var count = data[key].pitches || 0
        total = total + count
      }
      this.setState({ weekPitchCount: total })
    })
  }

  _getCardStyle() {
    return(this.props.today ? this._todayCardStyle() : this._weekCardStyle())
  }

  _todayCardStyle() {
    let pitchCount = this.state.todayPitchCount
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

  _weekCardStyle() {
    let pitchCount = this.state.weekPitchCount
    if (pitchCount <= 100){
      return(common.defaultCard)
    }
    else if (pitchCount <= 125){
      return(common.warningCard)
    }
    else{
      return(common.dangerCard)
    }
  }
}

const styles = StyleSheet.create({
  padded: {
    padding: 30,
    paddingTop: 10,
    paddingBottom: 10
  },
  name: {
    textAlign: 'center',
    fontSize: 21,
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  statBody: {
    fontWeight: 'bold',
    fontSize: 80,
    alignSelf: 'center'
  },
  cardHeader: {
    padding: 7
  },
  add: {
    textAlign: 'right',
    fontSize: 30,
    color: '#3F51B5',
    alignSelf: 'flex-end'
  },
  bottomRow: {
    height: 30,
    flexDirection: 'row',
    alignItems: 'center'
  }
})
