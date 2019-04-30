import React, {Component} from 'react';

import {
  View,
  StyleSheet,
} from 'react-native';
import { Button, Text } from "native-base";
import common from '../../style/common.style.js';
import RosterShowComponent from '../../components/roster/show_component';
import {db} from '../../config';

let rosterRef = db.ref('/players')

export default class RosterIndex extends Component {
  state = {
    roster: []
  };

  static navigationOptions = {
    title: 'Roster',
  };

  componentDidMount() {
    rosterRef.on('value', snapshot => {
      if (snapshot.val()) {
        let data = snapshot.val()
        let roster = Object.entries(data).map(arr =>
          ({
            id: arr[0],
            name: arr[1].name,
            pitches: arr[1].pitches || 0
          })
        )
        this.setState({roster: roster});
      } else {
        return false
      }
    });
  }

  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#FAFAFA',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.roster.length > 0 ?
          (<RosterShowComponent roster={this.state.roster} navigation={this.props.navigation} />) : (null)
        }
        <View style={styles.btnContainer}>
          <Button block primary onPress={() => this.props.navigation.navigate('RosterNew')}>
            <Text style={styles.btnText}>Add Player</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#FAFAFA'
  },
  btnContainer: {
    padding: 30,
    paddingTop: 15,
    paddingBottom: 20
  },
})
