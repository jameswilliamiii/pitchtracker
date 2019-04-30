import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, CardItem, Text, Icon } from "native-base";
import { Col, Row } from 'react-native-easy-grid';
import PropTypes from 'prop-types';

export default class PlayerCardComponent extends Component {

  static propTypes = {
    player: PropTypes.object.isRequired
  }

  render() {
    let icon = this._getIcon()
    return (
      <Card>
        <CardItem>
          <Col onPress={() => this.props.flip()} activeOpacity={100}>
            <Row size={1} style={styles.cardHeader}>
              <Col>
                <Text style={styles.name}>
                  {this.props.player.name}
                </Text>
              </Col>
            </Row>
            <Row size={3}>
              <Col>
                <Text style={styles.statBody}>{this.props.player.pitches}</Text>
              </Col>
            </Row>
            <Row size={1} style={styles.bottomRow}>
              <Col></Col>
              <Col>
                <Text style={styles.bodyLabel}>
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

  _getIcon() {
    if (this.props.today){
      return(
        <Icon
          name="ios-add-circle-outline"
          onPress={() => this.props.navigation.navigate('RosterShow', { id: this.props.player.id })}
          style={styles.add}
        />
      )
    } else {
      return(null)
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
    color: '#333333',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  statBody: {
    backgroundColor: 'white',
    fontWeight: 'bold',
    fontSize: 62,
    alignSelf: 'center'
  },
  bodyLabel: {
    color: '#999999',
    alignSelf: 'center',
    fontSize: 14,
    textTransform: 'uppercase'
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
